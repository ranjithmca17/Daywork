// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FaIndianRupeeSign } from "react-icons/fa6";
// // import "../../CssComponents/AllProduct.css";

// function Products() {
//     const { filteredProducts, handleCategoryChange } = useAppContext();
//     const [categories, setCategories] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const recordsPerPage = 5;

//     // Calculate pagination
//     const lastIndex = currentPage * recordsPerPage;
//     const firstIndex = lastIndex - recordsPerPage;
//     const records = filteredProducts.slice(firstIndex, lastIndex);
//     const npage = Math.ceil(filteredProducts.length / recordsPerPage);
//     const numbers = [...Array(npage).keys()].map(num => num + 1);

//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/allproducts');
//                 const products = response.data;
//                 const uniqueCategories = [...new Set(products.map(product => product.category))];
//                 setCategories(['All', ...uniqueCategories]);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleDropdownChange = (event) => {
//         handleCategoryChange(event.target.value);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
//             window.location.reload();
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleNextPage = () => {
//         if (currentPage < npage) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="p-5">
//             <h1 className="text-2xl font-bold mb-4">Product List</h1>
//             <div className="mb-4">
//                 <select 
//                     onChange={handleDropdownChange} 
//                     className="border rounded-md p-2"
//                 >
//                     {categories.map((category, index) => (
//                         <option key={index} value={category}>
//                             {category}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//                 <thead className="bg-gray-200">
//                     <tr>
//                         <th className='p-3 border'>Image</th>
//                         <th className='p-3 border'>Name</th>
//                         <th className='p-3 border'>Category</th>
//                         <th className='p-3 border'>Description</th>
//                         <th className='p-3 border'>Price</th>
//                         <th className='p-3 border'>SKU</th>
//                         <th className='p-3 border'>Stock</th>
//                         <th className='p-3 border'>Stock Status</th>
//                         <th className='p-3 border'>GST</th>
//                         <th className='p-3 border'>Edit</th>
//                         <th className='p-3 border'>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {records.map(product => (
//                         <tr key={product._id}>
//                             <td className="p-3 border">
//                                 <Image 
//                                     src={product.image}
//                                     alt='image'
//                                     height={50}
//                                     width={50}
//                                 />
//                             </td>
//                             <td className="p-3 border">{product.name}</td>
//                             <td className="p-3 border">{product.category}</td>
//                             <td className="p-3 border">{product.description}</td>
//                             <td className="p-3 border"><FaIndianRupeeSign className="inline"/>{product.finalPrice}</td>
//                             <td className="p-3 border">{product.sku}</td>
//                             <td className="p-3 border">{product.stock}</td>
//                             <td className="p-3 border">
//                                 {product.stock > 0 ? 
//                                     <p className="text-green-500">In Stock</p> : 
//                                     <p className="text-red-500">Out Of Stock</p>
//                                 }
//                             </td>
//                             <td className="p-3 border">{product.gst}%</td>
//                             <td className="p-3 border">
//                                 <Link href={`/edit/${product._id}`} className="text-blue-600 hover:underline">
//                                     Edit
//                                 </Link>
//                             </td>
//                             <td className="p-3 border">
//                                 <button 
//                                     onClick={() => handleDelete(product._id)} 
//                                     className="text-red-600 hover:underline"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <nav className="mt-4">
//                 <ul className="flex justify-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button 
//                             onClick={handlePrevPage} 
//                             disabled={currentPage === 1} 
//                             className="bg-blue-500 text-white p-2 rounded-l-md"
//                         >
//                             Previous
//                         </button>
//                     </li>
//                     {numbers.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button 
//                                 onClick={() => handlePageChange(number)} 
//                                 className="bg-blue-500 text-white p-2 mx-1 rounded-md"
//                             >
//                                 {number}
//                             </button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
//                         <button 
//                             onClick={handleNextPage} 
//                             disabled={currentPage === npage} 
//                             className="bg-blue-500 text-white p-2 rounded-r-md"
//                         >
//                             Next
//                         </button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Products;






'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaIndianRupeeSign } from "react-icons/fa6";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts');
                setProducts(response.data);

                // Extract unique categories
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(['All', ...uniqueCategories]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Calculate pagination
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products.slice(firstIndex, lastIndex);
    const npage = Math.ceil(products.length / recordsPerPage);
    const numbers = [...Array(npage).keys()].map(num => num + 1);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
            setProducts(products.filter(product => product._id !== id)); // Update state to remove deleted product
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="mb-4">
                <select className="border rounded-md p-2">
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className='p-3 border'>Image</th>
                        <th className='p-3 border'>Name</th>
                        <th className='p-3 border'>Category</th>
                        <th className='p-3 border'>Description</th>
                        <th className='p-3 border'>Price</th>
                        <th className='p-3 border'>SKU</th>
                        <th className='p-3 border'>Stock</th>
                        <th className='p-3 border'>Stock Status</th>
                        <th className='p-3 border'>GST</th>
                        <th className='p-3 border'>Edit</th>
                        <th className='p-3 border'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(product => (
                        <tr key={product._id}>
                            <td className="p-3 border">
                                <Image 
                                    src={product.image}
                                    alt='product image'
                                    height={50}
                                    width={50}
                                />
                            </td>
                            <td className="p-3 border">{product.name}</td>
                            <td className="p-3 border">{product.category}</td>
                            <td className="p-3 border">{product.description}</td>
                            <td className="p-3 border">
                                <FaIndianRupeeSign className="inline"/>{product.finalPrice}
                            </td>
                            <td className="p-3 border">{product.sku}</td>
                            <td className="p-3 border">
                                {Object.values(product.stock).reduce((total, qty) => total + qty, 0)}
                            </td>
                            <td className="p-3 border">
                                {Object.values(product.stock).some(qty => qty > 0) ? 
                                    <p className="text-green-500">In Stock</p> : 
                                    <p className="text-red-500">Out Of Stock</p>
                                }
                            </td>
                            <td className="p-3 border">{product.gst}%</td>
                            <td className="p-3 border">
                                <Link href={`/edit/${product._id}`} className="text-blue-600 hover:underline">
                                    Edit
                                </Link>
                            </td>
                            <td className="p-3 border">
                                <button 
                                    onClick={() => handleDelete(product._id)} 
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav className="mt-4">
                <ul className="flex justify-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1} 
                            className="bg-blue-500 text-white p-2 rounded-l-md"
                        >
                            Previous
                        </button>
                    </li>
                    {numbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button 
                                onClick={() => handlePageChange(number)} 
                                className="bg-blue-500 text-white p-2 mx-1 rounded-md"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === npage} 
                            className="bg-blue-500 text-white p-2 rounded-r-md"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Products;
