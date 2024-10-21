
'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import { MdOutlineArrowDropDown } from "react-icons/md";

function Products() {
    const { filteredProducts, handleCategoryChange, productStats } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    // Calculate pagination
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(npage).keys()].map(num => num + 1);


    const [displayValue, setDisplayValue] = useState('');

    const handleInStockClick = () => {
      setDisplayValue(productStats.inStock);
    };
  
    const handleOutOfStockClick = () => {
      setDisplayValue(productStats.outOfStock);
    };

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/allproducts');
                const products = response.data;
                const uniqueCategories = [...new Set(products.map(product => product.category))];
                setCategories(['All', ...uniqueCategories]);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDropdownChange = (event) => {
        handleCategoryChange(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/allproduct/delete/${id}`);
            setCurrentPage(1); 
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
        <div className="p-5 ">
              <div className="flex justify-center gap-4 pb-5">
        <div className="bg-blue-600 flex justify-center items-center rounded-xl flex-col  text-white p-3 w-full max-w-xs" style={{height:'145', width:'250'}}>
          <h1 className=" text-base  font-bold">Total Products</h1>
          <h1 className=" text-4xl font-extrabold">{productStats.totalProducts}</h1>
        </div>
        <div className="bg-blue-600 flex justify-center items-center flex-col text-4xl font-extrabold text-white p-3 w-full max-w-xs rounded-xl" style={{height:'145', width:'250'}}>
          <h1 className="text-base font-bold">Total Categories</h1>
          <h1 className="block  rounded-2xl text-white  p-1 text-4xl font-extrabold">{productStats.totalCategories}</h1>
        </div>
        {/* <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 rounded-xl w-full max-w-xs"style={{height:'145', width:'250'}}>
          <h1 className="text-base font-bold">Products</h1>
          <div className="flex justify-center gap-4">
            <span className="block text-sm rounded-2xl bg-white text-blue-600 p-1 font-bold">In Stock</span>
            <span className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold">Out of Stock</span>
          </div>
          <div className="flex justify-center gap-4 pb-4 items-center mr-8">
            <h1 className="block  rounded-2xl text-white  p-1 text-4xl font-extrabold"> {productStats.inStock} {productStats.outOfStock}</h1>
            {/* <h1 className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold">{productStats.inStock} {productStats.outOfStock}</h1> */}
          {/* </div> */}
        
        {/* </div> */}

        <div className="bg-blue-600 flex justify-center items-center flex-col text-white p-3 rounded-xl w-full max-w-xs"style={{height:'145', width:'250'}}>
      <h1 className="text-base font-bold">Products</h1>
      <div className="flex justify-center gap-4 mb-2">
        <span
          className="block text-sm rounded-2xl bg-white text-blue-600 p-1 font-bold cursor-pointer"
          onClick={handleInStockClick}
        >
          In Stock
        </span>
        <span
          className="block text-sm rounded-2xl bg-slate-200 text-slate-500 p-1 font-bold cursor-pointer"
          onClick={handleOutOfStockClick}
        >
          Out of Stock
        </span>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="block text-white text-4xl font-extrabold">{displayValue || productStats.inStock}</h1>
      </div>
    </div>
   
<div className="relative inline-block mt-2">
    <button 
       className="bg-blue-600 text-white rounded-lg flex items-center justify-center pl-3 pr-3 mt-20 font-semibold"
        style={{ height: '40px', width: 'auto' }} 
        onClick={() => document.getElementById('categorySelect').classList.toggle('hidden')}
    >
        Filter <MdOutlineArrowDropDown />
    </button>
    <div id="categorySelect" className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md hidden">
        {categories.map((category, index) => (
            <button 
                key={index} 
                className="w-full text-left p-2 hover:bg-blue-100" 
                onClick={() => {
                    handleDropdownChange({ target: { value: category } });
                    document.getElementById('categorySelect').classList.add('hidden');
                }}
            >
                {category}
            </button>
        ))}
    </div>
</div>

      </div>
           
           

<div className="overflow-x-auto bg-slate-100 p-10 ">
                <table className="min-w-full bg-slate-100 p-6">
                    <thead className="bg-slate-100">
                        <tr className="flex justify-between items-center gap-2">
                            <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">Product Name</th>
                            <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">Product Price</th>
                            <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">SKU</th>
                            <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">No. Of Stock</th>
                            <th className="bg-blue-200 text-slate-500 p-3 font-bold rounded-lg">In Stock / Out of Stock</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {records.map(product => (
                            <tr key={product._id} className="flex justify-between items-center gap-2">
                                <td className=" p-3  rounded-lg">{product.name}</td>
                                <td className=" p-3 rounded-lg ">${product.finalPrice}</td>
                                <td className=" p-3  rounded-lg">{product.sku}</td>
                                <td className=" p-3  rounded-lg ">{product.stock}</td>
                                <td className=" p-3  rounded-lg">
                                    {product.stock > 0 ? 
                                        <span className="text-green-500">In Stock</span> : 
                                        <span className="text-red-500">Out of Stock</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav className="mt-4">
                <ul className="flex justify-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white p-2 rounded-l-md">
                            Previous
                        </button>
                    </li>
                    {numbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => handlePageChange(number)} className="bg-blue-500 text-white p-2 mx-1 rounded-md">
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                        <button onClick={handleNextPage} disabled={currentPage === npage} className="bg-blue-500 text-white p-2 rounded-r-md">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Products;
