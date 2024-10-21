'use client'; 

import { useAppContext } from '@/app/Context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useAppContext } from '@/app/Context';

export default function CustomerOrders() {
  const { getAllOrders } = useAppContext();
  const router = useRouter();
  const { customerPhoneNumber } = router.query; // Access dynamic route param
  const [customerOrders, setCustomerOrders] = useState(null);

  useEffect(() => {
    if (!customerPhoneNumber) return;

    // Fetch customer-specific orders based on phone number
    const data = getAllOrders.message || [];
    const orders = data.filter(order => order.customerPhoneNumber === customerPhoneNumber);

    if (orders.length > 0) {
      setCustomerOrders(orders);
    } else {
      setCustomerOrders([]);
    }
  }, [customerPhoneNumber, getAllOrders.message]);

  if (!customerOrders) return <p>Loading...</p>;

  return (
    <div className="bg-blue-600 flex items-center justify-center text-white flex-col h-screen">
      <h1>Orders for {customerPhoneNumber}</h1>
      {customerOrders.length === 0 ? (
        <p>No orders found for this customer.</p>
      ) : (
        <ul>
          {customerOrders.map((order) => (
            <li key={order._id} className="mb-1">
              Order ID: {order._id}, Total Value: ${order.totalValue.toFixed(2)}, Date: {new Date(order.createdAt).toLocaleDateString()}
              <ul className="ml-4">
                {order.items.map((item, index) => (
                  <li key={item._id || index}>
                    Product Name: {item.productName || 'N/A'}, Price: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
