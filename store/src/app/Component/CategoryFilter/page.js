

'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/app/Context';

export default function CategoryFilter() {
    const { products, setFilteredProducts } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const uniqueCategories = React.useMemo(() => {
        if (!products || products.length === 0) {
            return [];
        }
        const categories = products.map(product => product.category);
        return [...new Set(categories)];
    }, [products]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product =>
                product.category === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products, setFilteredProducts]);

    const handleButtonClick = (category) => {
        setSelectedCategory(prevCategory =>
            prevCategory === category ? null : category
        );
    };

    return (
        <div className='mr-4 sm:mr-8'>
            <h1 className="text-lg sm:text-xl font-bold mb-4">Categories</h1>
            {uniqueCategories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(category)}
                    className={`p-2 rounded-lg mb-2 w-full transition-all duration-300 text-sm sm:text-base ${selectedCategory === category ? 'bg-white text-black' : 'bg-blue-600 text-white hover:bg-slate-50 hover:text-black'}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
