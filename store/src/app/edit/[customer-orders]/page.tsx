// CustomerOrders.js
'use client';
import { useEffect, useState } from "react";
// import { useAppContext } from "@/app/Context";

import { useRouter } from 'next/navigation';
import { useAppContext } from "@/app/Context";

const CustomerOrders = () => {
  const { getAllOrders } = useAppContext();
  const router = useRouter();
  const { name, phone } = router.query;
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    if (name && phone) {
      const data = getAllOrders.message || [];
      const orders = data.filter(order => 
        order.customerName === name && 
        order.customerPhoneNumber === phone
      );
      setCustomerOrders(orders);
    }
  }, [getAllOrders.message, name, phone]);

  if (!customerOrders.length) return <p>No orders found for this customer.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders for {name}</h1>
      <button onClick={() => window.history.back()} className="mb-4 bg-red-500 text-white rounded px-2 py-1">
        Back
      </button>
      <ul>
        {customerOrders.map((order) => (
          <li key={order._id} className="mb-4">
            <h2>Order ID: {order._id}</h2>
            <p>Total Value: ${order.totalValue.toFixed(2)}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={item._id || index}>
                  Product Name: {item.productName || 'N/A'}, Price: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrders;
