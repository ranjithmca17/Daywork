// CustomersDetail.js
'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/app/Context";
// import { useAppContext } from "@/app/Context";


export default function CustomersDetail() {
  const { getAllOrders } = useAppContext();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = getAllOrders.message || [];
    const uniqueCustomers = new Set();
    const customersArray = [];

    // Filter unique customers based on name and phone number
    data.forEach(order => {
      const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

      if (!uniqueCustomers.has(customerKey)) {
        uniqueCustomers.add(customerKey);
        
        customersArray.push({
          customerName: order.customerName,
          customerPhoneNumber: order.customerPhoneNumber,
        });
      }
    });

    // Set the unique customers array to state
    setFilteredCustomers(customersArray);
  }, [getAllOrders.message]);

  const handleViewAll = (customerName, customerPhoneNumber) => {
    // Navigate to the CustomerOrders page with query parameters
    router.push(`/customer-orders?name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhoneNumber)}`);
  };

  return (
    <div className="bg-blue-600 flex items-center justify-center text-white flex-col h-screen">
      <h1>Customers Detail</h1>
      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {filteredCustomers.map((customer, index) => (
            <li key={index} className="mb-2">
              {customer.customerName} - {customer.customerPhoneNumber}
              <button 
                onClick={() => handleViewAll(customer.customerName, customer.customerPhoneNumber)} 
                className="ml-4 bg-white text-blue-600 rounded px-2 py-1"
              >
                View All
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
