'use client'; // This directive enables client-side rendering

import { useEffect, useState } from 'react';
import axios from 'axios';

const AllWarehouse = () => {
    const [data, setData] = useState({ uniqueWarehouses: [], products: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState('covai');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allWarehouse');
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleWarehouseChange = (e) => {
        setSelectedWarehouse(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Calculate overall quantities and values
    const overallQuantity = data.products.reduce((total, product) => {
        return total + Object.values(product.stock).reduce((sum, qty) => sum + (qty || 0), 0);
    }, 0);

    const overallValue = data.products.reduce((total, product) => {
        return total + product.finalPrice * Object.values(product.stock).reduce((sum, qty) => sum + (qty || 0), 0);
    }, 0);

    // Filter products by selected warehouse
    const filteredProducts = data.products.filter(product => product.stock[selectedWarehouse] > 0);

    // Calculate warehouse-specific quantities and values
    const warehouseStats = data.uniqueWarehouses.map(warehouse => {
        const totalQty = data.products.reduce((sum, product) => {
            return sum + (product.stock[warehouse] || 0);
        }, 0);

        const totalValue = data.products.reduce((sum, product) => {
            return sum + (product.finalPrice * (product.stock[warehouse] || 0));
        }, 0);

        return { warehouse, totalQty, totalValue };
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Warehouses and Products</h1>
            <div className="mb-4">
                <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">Select Warehouse:</label>
                <select 
                    id="warehouse"
                    value={selectedWarehouse}
                    onChange={handleWarehouseChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                >
                    {data.uniqueWarehouses.map(warehouse => (
                        <option key={warehouse} value={warehouse}>
                            {warehouse}
                        </option>
                    ))}
                </select>
            </div>

            <h2 className="text-xl font-semibold mb-2">Products in {selectedWarehouse}:</h2>
            <p className="mb-4">Overall Quantity: {overallQuantity}</p>
            <p className="mb-4">Overall Total Value: ${overallValue.toFixed(2)}</p>

            {filteredProducts.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Stock</th>
                            <th className="py-2 px-4 border-b">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">${product.price}</td>
                                <td className="py-2 px-4 border-b">{product.stock[selectedWarehouse]}</td>
                                <td className="py-2 px-4 border-b">
                                    <img src={product.image} alt={product.name} className="h-12 w-12 object-cover" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available in this warehouse.</p>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-2">Warehouse Summary:</h2>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Warehouse</th>
                        <th className="py-2 px-4 border-b">Total Quantity</th>
                        <th className="py-2 px-4 border-b">Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouseStats.map(({ warehouse, totalQty, totalValue }) => (
                        <tr key={warehouse}>
                            <td className="py-2 px-4 border-b">{warehouse}</td>
                            <td className="py-2 px-4 border-b">{totalQty}</td>
                            <td className="py-2 px-4 border-b">${totalValue.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllWarehouse;
