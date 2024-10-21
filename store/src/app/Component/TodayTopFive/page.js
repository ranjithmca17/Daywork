'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopSellingProducts = () => {
    const [products, setProducts] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/today/topfive/products`);
                if (response.data.success) {
                    setProducts(response.data.message);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching data');
            } 
        };

        fetchTopSellingProducts();
    }, []);


    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Top Selling Products</h2>
            <table border={2}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Sold Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.image} alt={product.name} width={100} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopSellingProducts;


