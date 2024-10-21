'use client';
import React, { useState,useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/app/Context';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';

function Billcart() {
    const { cartItems,setCartItems } = useAppContext();
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('cash_on_hand');
    const [upiId, setUpiId] = useState('');
    const [cardNo, setCardNo] = useState('');



     // Handle quantity change
     const handleQuantityChange = useCallback(async (itemId, newQuantity,warehouse) => {
        if (newQuantity < 1) return;
        try {
            // Optimistically update state
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
            await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity,warehouse });
        } catch (err) {
            console.error('Error updating quantity:', err.message);
            // Optionally revert the optimistic update in case of error
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item._id === itemId ? { ...item, quantity: newQuantity - 1 } : item
                )
            );
        }
    }, [setCartItems]);


    const handleDelete = useCallback(async (itemId) => {
        try {
            // Optimistically remove item from state
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));

            await axios.delete(`http://localhost:4000/single/product/${itemId}`);
        } catch (error) {
            console.log('Error deleting item:', error);
            
            fetchCartItems();
        }
    }, [setCartItems]);


    const totalValue = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0).toFixed(2);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleOrderPlacement = async () => {
        try {
            const orderData = {
                items: cartItems,
                totalValue,
                totalQuantity,
                customerName,
                customerPhoneNumber,
                address,
                paymentType,
                upiId: paymentType === 'upiId' ? upiId : '',
                cardNo: paymentType === 'cardNo' ? cardNo : ''
            };

            await axios.post('http://localhost:4000/order', orderData);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 rounded-lg  text-black bg-white">
            <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
                <h1 className="text-xl sm:text-2xl">Cart</h1>
            </div>
            <form className="mt-4 bg-slate-200 p-4 space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id}>
                            <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
                                <div className="flex flex-col">
                                    <h2 className="text-md sm:text-lg font-bold">{item.productName}</h2>
                                    <span className="flex gap-2">
                                        <p className="text-sm">${item.productPrice.toFixed(2)}</p>
                                        <p className="text-sm">IGST 18%</p>
                                        <p className="text-sm">warehouse : {item.warehouse}</p>
                                        
                                    </span>
                                </div>
                                <div className="flex items-center flex-col">
                                    <div className='flex items-center'>
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1,item.warehouse)}
                                        >
                                            +
                                        </button>
                                        <span className="mx-1 font-bold">X{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="bg-gray-500 text-white rounded px-1 sm:px-2"
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1,item.warehouse)}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <p className="ml-2 text-sm">SKU: {item.sku}</p>
                                </div>
                                <div>
                                    <MdDelete size={20} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
                                </div>
                            </div>
                            <hr className="w-full border border-slate-300" />
                        </div>
                    ))}
                </div>

                {/* Total Quantity and Price */}
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <h1 className="text-lg sm:text-xl font-bold">Total</h1>
                    <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <ul className="text-sm">
                        <li>CGST</li>
                        <li>SGST</li>
                    </ul>
                    <ul className="text-sm">
                        <li>Quantity: {totalQuantity}</li>
                        <li>Total items: {cartItems.length}</li>
                    </ul>
                </div>
                <Link className="bg-black text-white p-2 rounded mt-4 w-full text-sm" href="/Component/BillConfirm" > order Confirm</Link>

                {/* Customer Info and Payment */}
                
                
            </form>
        </div>
    );
}

export default Billcart;
