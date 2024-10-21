'use client';
import React from 'react';

const Data = ({ val }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">Customer Details</h2>
            {val ? (
                <ul>
                    <li><strong>Name:</strong> {val.customerName}</li>
                    <li><strong>Phone Number:</strong> {val.customerPhoneNumber}</li>
                    <li><strong>Total Orders:</strong> {val.orders.length}</li>
                </ul>
            ) : (
                <p>No customer data available.</p>
            )}
        </div>
    );
};

export default Data;
