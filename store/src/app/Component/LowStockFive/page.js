


// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LowStockProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchLowStockProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/topfive/lowstock/products');
//                 if (response.data.success) {
//                     setProducts(response.data.products);
//                 } else {
//                     setError(response.data.message);
//                 }
//             } catch (error) {
//                 setError('Fetch error: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLowStockProducts();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>Top 5 Low Stock Products</h1>
//             <table border={2}>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Image</th>
//                         <th>Price</th>
//                         <th>Warehouse</th>
//                         <th>Stock</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => {
//                         // Iterate through each warehouse for the product
//                         return Object.keys(product.stock).map(warehouse => (
//                             <tr key={`${product._id}-${warehouse}`}>
//                                 <td>{product.name}</td>
//                                 <td>
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         height={50}
//                                         width={50}
//                                     />
//                                 </td>
//                                 <td>${product.price}</td>
//                                 <td>{warehouse}</td>
//                                 <td>{product.stock[warehouse]}</td>
//                             </tr>
//                         ));
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default LowStockProducts;






'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const LowStockProducts = () => {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/topfive/lowstock/products');
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Fetch error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLowStockProducts();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto ">
                <h1 className="text-2xl text-center font-bold my-4">Top 5 Low Stock Products by Warehouse</h1>
        <div className="container  px-4 flex items-center justify-evenly flex-wrap">

            {Object.keys(products).map(warehouse => (
                <div key={warehouse} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">{warehouse}</h2>
                    <table className="min-h-1.5 bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                           
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products[warehouse].map(product => (
                                <tr key={product._id} className="hover:bg-gray-100">
                                   <td className="py-2 px-4 border-b">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            height={200}
                                            width={200}
                                            className="h-12 w-12 object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">{product.name}</td>

                                    <td className="py-2 px-4 border-b">${product.price}</td>
                                    <td className="py-2 px-4 border-b">{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
                </div>
        </div>
    );
};

export default LowStockProducts;
