'use client';
import React, { useState,useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/app/Context';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';

function BillConfirm() {
    const { cartItems,setCartItems } = useAppContext();
    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('cash_on_hand');
    const [upiId, setUpiId] = useState('');
    const [cardNo, setCardNo] = useState('');



     // Handle quantity change
    //  const handleQuantityChange = useCallback(async (itemId, newQuantity,warehouse) => {
    //     if (newQuantity < 1) return;
    //     try {
    //         // Optimistically update state
    //         setCartItems(prevItems =>
    //             prevItems.map(item =>
    //                 item._id === itemId ? { ...item, quantity: newQuantity } : item
    //             )
    //         );
    //         await axios.put(`http://localhost:4000/updateCartItem/${itemId}`, { quantity: newQuantity,warehouse });
    //     } catch (err) {
    //         console.error('Error updating quantity:', err.message);
    //         // Optionally revert the optimistic update in case of error
    //         setCartItems(prevItems => 
    //             prevItems.map(item => 
    //                 item._id === itemId ? { ...item, quantity: newQuantity - 1 } : item
    //             )
    //         );
    //     }
    // }, [setCartItems]);


    // const handleDelete = useCallback(async (itemId) => {
    //     try {
    //         // Optimistically remove item from state
    //         setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));

    //         await axios.delete(`http://localhost:4000/single/product/${itemId}`);
    //     } catch (error) {
    //         console.log('Error deleting item:', error);
            
    //         fetchCartItems();
    //     }
    // }, [setCartItems]);


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
console.log(cartItems);

    return (
        // <div className="p-4 rounded-lg  text-black bg-white">
        //     <div className="text-center bg-blue-700 text-white p-4 rounded-t-lg">
        //         <h1 className="text-xl sm:text-2xl">Bill Confirm Page</h1>
        //     </div>
        //     <form className="mt-4 bg-slate-200 p-4 space-y-4">
        //         {/* Cart Items */}
        //         <div className="space-y-4">
        //             {cartItems.map((item) => (
        //                 <div key={item._id}>
        //                     <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
        //                         <div className="flex flex-col">
        //                             <h2 className="text-md sm:text-lg font-bold">{item.productName}</h2>
        //                             <span className="flex gap-2">
        //                                 <p className="text-sm">${item.productPrice.toFixed(2)/item.quantity}</p>
        //                                 <p className="text-sm">IGST 18%</p>
        //                                 {/* <p className="text-sm">warehouse : {item.warehouse}</p> */}
                                        
        //                             </span>
        //                         </div>
        //                         <div className="flex items-center flex-col">
        //                             <div className='flex items-center'>

        //                                 <span className="mx-1 font-bold">X{item.quantity}</span>

        //                             </div>
        //                             <p className="ml-2 text-sm">SKU: {item.sku}</p>
        //                         </div>
        //                         {/* <div>
        //                             <MdDelete size={20} className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
        //                         </div> */}
        //                         <div className="">
                                    
        //                             <h3>${item.productPrice.toFixed(2)}</h3>
        //                         </div>
        //                     </div>
        //                     <hr className="w-full border border-slate-300" />
        //                 </div>
        //             ))}
        //         </div>

        //         {/* Total Quantity and Price */}
        //         <div className="flex flex-col md:flex-row justify-between mt-4">
        //             <h1 className="text-lg sm:text-xl font-bold">Total</h1>
        //             <h1 className="text-lg sm:text-xl font-bold">${totalValue}</h1>
        //         </div>
        //         <div className="flex flex-col md:flex-row justify-between mt-4">
        //             <ul className="text-sm">
        //                 <li>CGST</li>
        //                 <li>SGST</li>
        //             </ul>
        //             <ul className="text-sm">
        //                 <li>Quantity: {totalQuantity}</li>
        //                 <li>Total items: {cartItems.length}</li>
        //             </ul>
        //         </div>

        //         {/* Customer Info and Payment */}
        //         <div className="mt-4 bg-blue-500 p-4 rounded text-white">
        //             <div className="flex flex-col md:flex-row md:items-center mb-2">
        //                 <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerName">Customer Name:</label>
        //                 <input
        //                     type="text"
        //                     placeholder='Enter Customer Name :'
        //                     id="customerName"
        //                     value={customerName}
        //                     onChange={(e) => setCustomerName(e.target.value)}
        //                     className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
        //                     required
        //                 />
        //             </div>
        //             <div className="flex flex-col md:flex-row md:items-center mb-2">
        //                 <label className="font-bold w-full md:w-1/3 text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
        //                 <input
        //                     type="tel" // Changed to 'tel' for better mobile handling
        //                     id="customerPhoneNumber"
        //                     value={customerPhoneNumber}
        //                     onChange={(e) => setCustomerPhoneNumber(e.target.value)}
        //                     className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
        //                     required
        //                 />
        //             </div>

        //             {/* Address Input */}
        //             <div className="flex flex-col md:flex-row md:items-center mb-4">
        //                 <label className="w-full md:w-1/3 font-bold text-sm" htmlFor="address">Address:</label>
        //                 <textarea
        //                     id="address"
        //                     placeholder='Enter your address...'
        //                     rows={3}
        //                     value={address}
        //                     onChange={(e) => setAddress(e.target.value)}
        //                     className='w-full md:w-2/3 p-2 border rounded text-sm text-black'
        //                     required
        //                 />
        //             </div>

        //             {/* Payment Method Buttons */}
        //             <div className="flex flex-col items-center justify-start md:flex-row md:items-center mb-4 ">
        //                 <div className="gap-5 flex space-x-2 w-full md:w-2/3 items-center">
        //                     <button
        //                         type="button"
        //                         className={`p-2 w-full rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
        //                         onClick={() => setPaymentType('cash_on_hand')}
        //                     >
        //                         Cash on Hand
        //                     </button>
        //                     <button
        //                         type="button"
        //                         className={`p-2 w-full rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
        //                         onClick={() => setPaymentType('upiId')}
        //                     >
        //                         UPI ID
        //                     </button>
        //                     <button
        //                         type="button"
        //                         className={`p-2 w-full rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
        //                         onClick={() => setPaymentType('cardNo')}
        //                     >
        //                         Card Number
        //                     </button>
        //                 </div>
        //             </div>

        //             {paymentType === 'upiId' && (
        //                 <div className="flex flex-col md:flex-row md:items-center mb-2">
        //                     <label className="font-bold w-full md:w-1/3 text-sm">UPI ID:</label>
        //                     <input
        //                         type="text"
        //                         placeholder='Enter UPI ID'
        //                         value={upiId}
        //                         onChange={(e) => setUpiId(e.target.value)}
        //                         className="border rounded p-2 w-full md:w-2/3 text-sm"
        //                     />
        //                 </div>
        //             )}
        //             {paymentType === 'cardNo' && (
        //                 <div className="flex flex-col md:flex-row md:items-center mb-2">
        //                     <label className="font-bold w-full md:w-1/3 text-sm">Card Number:</label>
        //                     <input
        //                         type="text"
        //                         placeholder='Enter Card Number'
        //                         value={cardNo}
        //                         onChange={(e) => setCardNo(e.target.value)}
        //                         className="border rounded p-2 w-full md:w-2/3 text-sm text-black"
        //                     />
        //                 </div>
        //             )}
        //             <button
        //                 type="button"
        //                 onClick={handleOrderPlacement}
        //                 className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
        //             >
        //                 Place Order
        //             </button>
                
        //          <Link href="/Component/BillConfirm"> order Confirm</Link>
        //         </div>
        //     </form>
        // </div>
        <div className="max-w-full mx-auto p-4 rounded-lg text-black bg-white">
    <div className="text-center bg-black text-white p-4 rounded-t-lg">
        <h1 className="text-xl sm:text-2xl">Bill Confirm Page</h1>
    </div>
    <form className="mt-4 bg-gray-100 p-4 space-y-4">
        {/* Cart Items Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-3 text-left">Product</th>
                        <th className="py-2 px-3 text-left">Quantity</th>
                        <th className="py-2 px-3 text-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item._id} className="border-b">
                            <td className="py-3 px-3">{item.productName}<br/>
                            Price: {item.productPrice.toFixed(2)/item.quantity}</td>
                            <td className="py-3 px-3">X{item.quantity}</td>
                            <td className="py-3 px-3">${item.productPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

        {/* Customer Info and Payment */}
        <div className="mt-4 bg-blue-500 p-4 rounded text-white">
            <div className="flex flex-col mb-2">
                <label className="font-bold text-sm" htmlFor="customerName">Customer Name:</label>
                <input
                    type="text"
                    placeholder='Enter Customer Name :'
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border rounded p-2 w-full text-sm text-black"
                    required
                />
            </div>
            <div className="flex flex-col mb-2">
                <label className="font-bold text-sm" htmlFor="customerPhoneNumber">Customer Phone:</label>
                <input
                    type="tel"
                    id="customerPhoneNumber"
                    value={customerPhoneNumber}
                    onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                    className="border rounded p-2 w-full text-sm text-black"
                    required
                />
            </div>

            {/* Address Input */}
            <div className="flex flex-col mb-4">
                <label className="font-bold text-sm" htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    placeholder='Enter your address...'
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='w-full p-2 border rounded text-sm text-black'
                    required
                />
            </div>

            {/* Payment Method Buttons */}
            <div className="flex flex-col items-center mb-4">
                <div className="flex gap-5 w-full">
                    <button
                        type="button"
                        className={`p-2 w-full rounded ${paymentType === 'cash_on_hand' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                        onClick={() => setPaymentType('cash_on_hand')}
                    >
                        Cash on Hand
                    </button>
                    <button
                        type="button"
                        className={`p-2 w-full rounded ${paymentType === 'upiId' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                        onClick={() => setPaymentType('upiId')}
                    >
                        UPI ID
                    </button>
                    <button
                        type="button"
                        className={`p-2 w-full rounded ${paymentType === 'cardNo' ? 'bg-blue-600 text-white' : 'bg-slate-600'}`}
                        onClick={() => setPaymentType('cardNo')}
                    >
                        Card Number
                    </button>
                </div>
            </div>

            {paymentType === 'upiId' && (
                <div className="flex flex-col mb-2">
                    <label className="font-bold text-sm">UPI ID:</label>
                    <input
                        type="text"
                        placeholder='Enter UPI ID'
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="border rounded p-2 w-full text-sm"
                    />
                </div>
            )}
            {paymentType === 'cardNo' && (
                <div className="flex flex-col mb-2">
                    <label className="font-bold text-sm">Card Number:</label>
                    <input
                        type="text"
                        placeholder='Enter Card Number'
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        className="border rounded p-2 w-full text-sm text-black"
                    />
                </div>
            )}
            <button
                type="button"
                onClick={handleOrderPlacement}
                className="bg-black text-white p-2 rounded mt-4 w-full text-sm"
            >
                Place Order
            </button>

            <Link href="/Component/BillConfirm" className="mt-3 text-center text-blue-500">Order Confirm</Link>
        </div>
    </form>
</div>

    );
}

export default BillConfirm;
