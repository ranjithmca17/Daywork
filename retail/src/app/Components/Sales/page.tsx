'use client';
import { useAppContext } from '@/app/Context';
import React, { useState, useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
export default function Sales() {
    const { getAllOrders } = useAppContext();
    const orders = getAllOrders?.message || [];
    const [filter, setFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // Change this to adjust the number of orders per page

    useEffect(() => {
        filterOrders();
    }, [filter, dateFilter, orders]);

    const filterOrders = () => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const filtered = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const isWithinDateRange =
                (dateFilter === 'all') ||
                (dateFilter === 'today' && orderDate.toDateString() === today.toDateString()) ||
                (dateFilter === 'last7' && orderDate >= sevenDaysAgo);

            const customerName = order.customerName.toLowerCase();
            const customerPhoneNumber = order.customerPhoneNumber.toLowerCase();
            const matchesFilter =
                customerName.includes(filter.toLowerCase()) ||
                customerPhoneNumber.includes(filter.toLowerCase());

            return isWithinDateRange && matchesFilter;
        });

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to the first page when filtering
    };

    const totalOrders = filteredOrders.length;
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

    const totalAmount = currentOrders.reduce((sum, order) => sum + order.totalValue, 0).toFixed(2);
    const totalCustomers = new Set(currentOrders.map(order => order.customerName)).size;
    const totalSoldProducts = currentOrders.reduce((sum, order) => sum + order.totalQuantity, 0);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Get All Customers Orders</h1>
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder='Filter by Customer Name or Phone Number'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
                />
                <button
                    onClick={filterOrders}
                    className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 transition"
                >
                    Submit
                </button>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 ml-2"
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="last7">Last 7 Days</option>
                </select>
            </div>

            <div className="mb-4">
                <p>Total Amount: <FaIndianRupeeSign className="inline"/>{totalAmount}</p>
                <p>Total Customers: {totalCustomers}</p>
                <p>Total Sold Products: {totalSoldProducts}</p>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border-b border-gray-300 px-4 py-2">Items</th>
                        <th className="border-b border-gray-300 px-4 py-2">Total Value</th>
                        <th className="border-b border-gray-300 px-4 py-2">Total Quantity</th>
                        <th className="border-b border-gray-300 px-4 py-2">Customer Name</th>
                        <th className="border-b border-gray-300 px-4 py-2">Customer Phone Number</th>
                        <th className="border-b border-gray-300 px-4 py-2">Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">No orders found.</td>
                        </tr>
                    ) : (
                        currentOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="border-b border-gray-300 px-4 py-2">
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={item._id || index}>
                                                Product Name: {item.productName || 'N/A'},
                                                Product Price: <FaIndianRupeeSign className="inline"/>{item.productPrice ? item.productPrice.toFixed(2) : 'N/A'},
                                                Quantity: {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2"><FaIndianRupeeSign className="inline"/>{order.totalValue.toFixed(2)}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.totalQuantity}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.customerName}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{order.customerPhoneNumber}</td>
                                <td className="border-b border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Previous
                </button>
                
                {/* Page numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = index + Math.max(1, currentPage - 2);
                    if (pageNumber <= totalPages) {
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`mx-1 px-3 py-2 rounded-md ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                })}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
