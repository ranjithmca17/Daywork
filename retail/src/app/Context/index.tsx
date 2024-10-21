'use client';
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext('Hello');

export function AppWrapper({ children }) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [todayTotal,setTodayTotal]=useState([]);
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
    const [userId, setUserId] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [getAllOrders, setGetAllOrders] = useState('');
    const[allVentors,setAllVentors]=useState('');
    // New state for product statistics
    const [productStats, setProductStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        inStock: 0,
        outOfStock: 0,
    });

    useEffect(()=>{
        const TodayTotalSales= async()=>{
            try{
                const response = await axios.get('http://localhost:4000/todaySales');
                console.log("response : ",response);
                if(response.data.success){
                    setTodayTotal(response.data.message);
                    setTotalAmount(response.data.totalAmount);
                    setTotalQuantity(response.data.totalQuantity);
                }
                
            }catch(error){
                console.log(error);
                
            }
        }
        TodayTotalSales();
    },[])


    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:4000/admin/verify-token', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const { success, user } = response.data;
                    if (success) {
                        setAuth({ isAuthenticated: true, user });
                    } else {
                        localStorage.removeItem('auth-token');
                        setAuth({ isAuthenticated: false, user: null });
                    }
                } catch (error) {
                    console.error("Token verification error:", error);
                    localStorage.removeItem('auth-token');
                    setAuth({ isAuthenticated: false, user: null });
                }
            }
        };
        verifyToken();
    }, [token]);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.admin.id || "");
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, [token]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/allproducts');
                setProducts(response.data);

                // Calculate stats
                const totalProducts = response.data.length;
                const uniqueCategories = new Set(response.data.map(product => product.category));
                const totalCategories = uniqueCategories.size;
                const inStock = response.data.filter(product => product.stock > 0).length;
                const outOfStock = totalProducts - inStock;

                setProductStats({
                    totalProducts,
                    totalCategories,
                    inStock,
                    outOfStock,
                });

                console.log("Total Products:", totalProducts);
                console.log("Total Categories:", totalCategories);
                console.log("Total Products In Stock:", inStock);
                console.log("Total Products Out of Stock:", outOfStock);

            } catch (err) {
                console.error('Error fetching products:', err.message);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [products, selectedCategory]);

    const login = async (token, user) => {
        localStorage.setItem('auth-token', token);
        setAuth({ isAuthenticated: true, user });
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        setAuth({ isAuthenticated: false, user: null });
        window.location.href = '/';
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const getAllOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/fetch/graph');
            setGetAllOrders(response.data);
        } catch (error) {
            console.error("Fetching data error", error);
        }
    };

    useEffect(() => {
        getAllOrderDetails();
    }, []);

    console.log("totalAmount from context : ",totalAmount);
    

const allVentorsGet=async()=>{
try{
const response=await axios.get('http://localhost:4000/allventors');
setAllVentors(response.data);

}catch(error){
    console.log("All vendors cannot fetching : ",error);
    
}
    }
    useEffect(() => {
        allVentorsGet();
    }, []);


    return (
        <AppContext.Provider value={{ 
            auth, 
            login, 
            logout, 
            userId, 
            filteredProducts, 
            handleCategoryChange, 
            getAllOrders, 
            productStats,
            todayTotal,
            totalAmount,
            totalQuantity,
            allVentors
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
