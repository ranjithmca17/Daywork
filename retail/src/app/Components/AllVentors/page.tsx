// 'use client'

// import { useAppContext } from "@/app/Context"

// export default function page() {
//   const {allVentors}=useAppContext();

//   console.log(allVentors.message);
  

//   return (
//     <div>
//   All ventors
//     </div>
//   )
// }

'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from "@/app/Context";

export default function Page() {
  const { allVentors } = useAppContext();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        if (allVentors.success) {
          setVendors(allVentors.message);
        } else {
          console.error('Failed to fetch vendors:', allVentors.message);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, [allVentors]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Vendors</h1>
      {vendors.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Products</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{vendor.name}</td>
                <td className="py-2 px-4 border-b">{vendor.address}</td>
                <td className="py-2 px-4 border-b">{vendor.phone}</td>
                <td className="py-2 px-4 border-b">{vendor.email}</td>
                <td className="py-2 px-4 border-b">
                  {vendor.products.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {vendor.products.map(product => (
                        <li key={product.productId}>
                          {product.productName} - ${product.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No Products'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No vendors found.</p>
      )}
    </div>
  );
}
