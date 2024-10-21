'use client';

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext("");

export function AppWrapper({ children }) {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const [token, setToken] = useState(localStorage.getItem('auth-token') || '');
    const [storeId, setStoreId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [getAllOrders, setGetAllOrders] = useState('');

    // Token verification
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return;
            try {
                const { data } = await axios.get('http://localhost:4000/store/verify-token', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const { success, user } = data;
                setAuth({ isAuthenticated: success, user: success ? user : null });
                if (!success) localStorage.removeItem('auth-token');
            } catch (error) {
                console.error("Token verification error:", error);
                localStorage.removeItem('auth-token');
                setAuth({ isAuthenticated: false, user: null });
            }
        };
        verifyToken();
    }, [token]);

    // Decode token to get store ID
    useEffect(() => {
        if (token) {
            try {
                const { store } = jwtDecode(token);
                setStoreId(store.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/allproducts');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    // Filter products based on search term
    useEffect(() => {
        const filtered = searchTerm
            ? products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : products;
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/getall/Cartproducts');
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch all order details
    useEffect(() => {
        const getAllOrderDetails = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/fetch/graph');
                setGetAllOrders(data);
            } catch (error) {
                console.error("Fetching orders error:", error);
            }
        };
        getAllOrderDetails();
    }, []);

    // User login
    const login = (token, user) => {
        localStorage.setItem('auth-token', token);
        setAuth({ isAuthenticated: true, user });
    };

    // Fetch store name
    useEffect(() => {
        const fetchStoreName = async () => {
            if (!storeId) return;
            try {
                const { data } = await axios.get(`http://localhost:4000/storename/${storeId}`);
                if (data.success) {
                    setStoreName(data.store.name);
                } else {
                    console.error("Error fetching store name");
                }
            } catch (error) {
                console.error("Error fetching store name:", error);
            }
        };
        fetchStoreName();
    }, [storeId]);

    // User logout
    const logout = () => {
        localStorage.removeItem('auth-token');
        setAuth({ isAuthenticated: false, user: null });
        window.location.href = '/login';
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const billCart = async (productDetails) => {
        console.log(productDetails);
        
        try {
            const response = await axios.post('http://localhost:4000/addtobill', [productDetails]);
            console.log('Add to bill response:', response.data);
            fetchCartItems(); // Refresh cart items after adding
        } catch (error) {
            console.error('Error adding to bill:', error.message);
        }
    };

    return (
        <AppContext.Provider value={{
            auth,
            login,
            logout,
            products,
            filteredProducts,
            searchTerm,
            handleSearchChange,
            billCart,
            cartItems,
            getAllOrders,
            storeId,
            storeName,
            setFilteredProducts,
            setCartItems
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
