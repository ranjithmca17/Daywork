'use client';

import '@/app/Component/AllOrderProducts/AllOrderProducts.css';
import { useAppContext } from '@/app/Context';
import Image from 'next/image';
import { useState } from 'react';

function Products() {
    const { filteredProducts, searchTerm, handleSearchChange, billCart } = useAppContext();
    const [sortOrder, setSortOrder] = useState('asc');
    const [warehouseFilter, setWarehouseFilter] = useState('');

    const selectedProducts = []; // Array to hold selected products

    const handleCardClick = (product) => {
        if (!warehouseFilter) {
            alert("Please select a warehouse before ordering.");
            return;
        }

        const stockAmount = product.stock?.[warehouseFilter] || 0;
        if (stockAmount > 0) {
            const productDetails = {
                productId: product._id,
                name: product.name,
                price: product.finalPrice,
                category: product.category,
                gst: product.gst,
                sku: product.sku,
                quantity: 1, // Default quantity
                warehouse: warehouseFilter
            };

            // Add product to the selectedProducts array
            selectedProducts.push(productDetails);
            console.log('Selected Products:', selectedProducts);

            // Call the billCart function with the selected product
            billCart(productDetails);
        } else {
            alert("Out of stock in the selected warehouse, cannot order this product");
        }
    };

    // Sorting logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOrder) {
            case 'asc':
                return a.name.localeCompare(b.name);
            case 'desc':
                return b.name.localeCompare(a.name);
            case 'lowToHigh':
                return a.finalPrice - b.finalPrice;
            case 'highToLow':
                return b.finalPrice - a.finalPrice;
            default:
                return 0;
        }
    });

    // Warehouse filtering logic
    const filteredProductsByWarehouse = sortedProducts.filter(product => {
        return !warehouseFilter || (product.stock && product.stock[warehouseFilter] > 0);
    });

    return (
        <div className="p-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-center mb-4">Order Products</h1>
            <form className="mb-4">
                <input
                    type="text"
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded"
                />
            </form>
            <div className="mb-4 text-end">
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded cursor-pointer w-full sm:w-auto"
                >
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                    <option value="lowToHigh">Low Price to High</option>
                    <option value="highToLow">High Price to Low</option>
                </select>
            </div>
            <div className="mb-4 text-end">
                <select
                    id="warehouseFilter"
                    value={warehouseFilter}
                    onChange={(e) => setWarehouseFilter(e.target.value)}
                    className="p-2 border rounded cursor-pointer w-full sm:w-auto"
                >
                    <option value="">Select a Warehouse</option>
                    {filteredProducts.length > 0 && Object.keys(filteredProducts[0]?.stock || {}).map(warehouse => (
                        <option key={warehouse} value={warehouse}>
                            {warehouse}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex-grow h-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {filteredProductsByWarehouse.length === 0 ? (
                        <p className="text-center col-span-full">No products found</p>
                    ) : (
                        filteredProductsByWarehouse.map(product => (
                            <div
                                key={product._id}
                                className="border rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
                                onClick={() => handleCardClick(product)}
                            >
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    width={160} 
                                    height={130} 
                                    className="w-full h-40 object-cover" 
                                />
                                <div className='bg-blue-600 text-white text-center p-2'>
                                    <h4 className="text-lg">{product.name}</h4>
                                    <h2>
                                        Stock: {warehouseFilter && product.stock ? product.stock[warehouseFilter] || 0 : product.stock ? Object.values(product.stock).reduce((acc, val) => acc + Number(val), 0) : 0}
                                    </h2>
                                    <p className="product-price">${product.finalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
