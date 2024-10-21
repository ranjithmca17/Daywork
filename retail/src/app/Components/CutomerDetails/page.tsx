

// 'use client';
// import { useAppContext } from "@/app/Context";
// import { useEffect, useState } from "react";

// export default function CustomersDetail() {
//   const { getAllOrders } = useAppContext();
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const customersPerPage = 10;

//   useEffect(() => {
//     const data = getAllOrders.message || [];
//     const uniqueCustomers = new Set();
//     const customersArray = [];

//     data.forEach(order => {
//       const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

//       if (!uniqueCustomers.has(customerKey)) {
//         uniqueCustomers.add(customerKey);
        
//         customersArray.push({
//           customerName: order.customerName,
//           customerPhoneNumber: order.customerPhoneNumber,
//           orders: data.filter(o => 
//             o.customerName === order.customerName && 
//             o.customerPhoneNumber === order.customerPhoneNumber
//           )
//         });
//       }
//     });

//     setFilteredCustomers(customersArray);
//   }, [getAllOrders.message]);

//   const handleViewAll = (orders) => {
//     setSelectedCustomerOrders(orders);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setCurrentPage(1); // Reset to the first page when searching
//   };

//   const filteredResults = filteredCustomers.filter(customer => 
//     customer.customerName.toLowerCase().includes(searchTerm)
//   );

//   // Pagination logic
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredResults.slice(indexOfFirstCustomer, indexOfLastCustomer);
//   const totalPages = Math.ceil(filteredResults.length / customersPerPage);

//   return (
//     <div className="flex h-screen flex-col md:flex-row">
//       {selectedCustomerOrders ? (
//         <div className="flex-1 bg-gray-100 p-4">
//           <div className="bg-white text-black p-4 rounded">
//             <h2 className="text-2xl mb-2">Purchase Details</h2>
//             <button 
//               onClick={() => setSelectedCustomerOrders(null)} 
//               className="mb-2 bg-red-500 text-white rounded px-2 py-1"
//             >
//               Back to Customers
//             </button>
//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="py-2">S.No</th>
//                   <th className="py-2">Order ID</th>
//                   <th className="py-2">Total Value</th>
//                   <th className="py-2">Date</th>
//                   <th className="py-2">Items</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedCustomerOrders.map((order, index) => (
//                   <tr key={order._id} className="border-b">
//                     <td className="py-2">{index + 1}</td>
//                     <td className="py-2">{order._id}</td>
//                     <td className="py-2">${order.totalValue.toFixed(2)}</td>
//                     <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
//                     <td className="py-2">
//                       <ul className="list-disc list-inside">
//                         {order.items.map((item, index) => (
//                           <li key={item._id || index}>
//                             {item.productName || 'N/A'}: ${item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Qty: {item.quantity}
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full md:w-1/3 bg-blue-600 text-white p-4">
//           <h1 className="text-2xl mb-4">Customers Detail</h1>
//           <input
//             type="text"
//             placeholder="Search Customer Name"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="mb-4 p-2 rounded"
//           />
//           {filteredResults.length === 0 ? (
//             <p>No customers found.</p>
//           ) : (
//             <>
//               <table className="w-full text-left">
//                 <thead>
//                   <tr>
//                     <th className="py-2">S.No</th>
//                     <th className="py-2">Customer Name</th>
//                     <th className="py-2">Phone Number</th>
//                     <th className="py-2">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCustomers.map((customer, index) => (
//                     <tr key={index} className="border-b">
//                       <td className="py-2">{index + indexOfFirstCustomer + 1}</td>
//                       <td className="py-2">{customer.customerName}</td>
//                       <td className="py-2">{customer.customerPhoneNumber}</td>
//                       <td className="py-2">
//                         <button 
//                           onClick={() => handleViewAll(customer.orders)} 
//                           className="bg-white text-blue-600 rounded px-2 py-1"
//                         >
//                           View All
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="flex justify-between mt-4">
//                 <button 
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="bg-blue-500 text-white rounded px-4 py-2"
//                 >
//                   Previous
//                 </button>
//                 <span>{`Page ${currentPage} of ${totalPages}`}</span>
//                 <button 
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="bg-blue-500 text-white rounded px-4 py-2"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




'use client';
import { useAppContext } from "@/app/Context";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { FaIndianRupeeSign } from "react-icons/fa6";
export default function CustomersDetail() {
  const { getAllOrders } = useAppContext();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  useEffect(() => {
    const data = getAllOrders.message || [];
    const uniqueCustomers = new Set();
    const customersArray = [];

    data.forEach(order => {
      const customerKey = `${order.customerName}-${order.customerPhoneNumber}`;

      if (!uniqueCustomers.has(customerKey)) {
        uniqueCustomers.add(customerKey);
        
        customersArray.push({
          customerName: order.customerName,
          customerPhoneNumber: order.customerPhoneNumber,
          orders: data.filter(o => 
            o.customerName === order.customerName && 
            o.customerPhoneNumber === order.customerPhoneNumber
          )
        });
      }
    });

    setFilteredCustomers(customersArray);
  }, [getAllOrders.message]);

  const handleViewAll = (orders, customerName) => {
    setSelectedCustomerOrders(orders);
    setSelectedCustomerName(customerName);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredResults = filteredCustomers.filter(customer => 
    customer.customerName.toLowerCase().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredResults.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredResults.length / customersPerPage);

  return (
    <div className="flex h-screen">
      {selectedCustomerOrders ? (
        <div className="flex-1 bg-gray-100 p-4">
          <div className="bg-white text-black p-4 rounded">
            <div className="flex items-center justify-between">
            {/* <button 
              onClick={() => {
                setSelectedCustomerOrders(null);
                setSelectedCustomerName('');
              }} 
              className="mb-2 bg-red-500 text-white rounded px-2 py-1"
            >
              Back to Customers
            </button> */}
            <GrFormPrevious onClick={() => {
                setSelectedCustomerOrders(null);
                setSelectedCustomerName('');
              }} className="font-bold cursor-pointer text-2xl"/>
            <h2 className="text-2xl mb-2">Purchase Details</h2>
            <h1 className="text-2xl mb-2">Customer Name : {selectedCustomerName}</h1>
            </div>
           
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">S.No</th>
                  {/* <th className="py-2">Order ID</th> */}
                  <th className="py-2">Items</th>
                  <th className="py-2">Total Value</th>
                  <th className="py-2">Date</th>

                </tr>
              </thead>
              <tbody>
                {selectedCustomerOrders.map((order, index) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    {/* <td className="py-2">{order._id}</td> */}
                    <td className="py-2">
                      <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                          <li key={item._id || index}>
                            {item.productName || 'N/A'}: <FaIndianRupeeSign className="inline"/>{item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}, Qty: {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2"> <FaIndianRupeeSign className="inline"/>{order.totalValue.toFixed(2)}</td>

                    <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full bg-blue-600 text-white p-4 gap-2">
          <h1 className="text-2xl mb-4">Customers Detail</h1>
          <input
            type="text"
            placeholder="Search Customer Name"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 p-2 rounded text-black"
          />
          {filteredResults.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr>
                    <th className="py-2">S.No</th>
                    <th className="py-2">Customer Name</th>
                    <th className="py-2">Phone Number</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{index + indexOfFirstCustomer + 1}</td>
                      <td className="py-2">{customer.customerName}</td>
                      <td className="py-2">{customer.customerPhoneNumber}</td>
                      <td className="py-2">
                        <button 
                          onClick={() => handleViewAll(customer.orders, customer.customerName)} 
                          className="bg-white text-blue-600 rounded px-2 py-1"
                        >
                          View All
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-black text-white rounded px-4 py-2"
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-black text-white rounded px-4 py-2"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
