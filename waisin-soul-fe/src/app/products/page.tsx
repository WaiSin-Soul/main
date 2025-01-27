"use client"
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const productsData = [
    { id: 1, name: 'Product 1', description: 'Description for product 1' },
    { id: 2, name: 'Product 2', description: 'Description for product 2' },
    { id: 3, name: 'Product 3', description: 'Description for product 3' },
    // Add more products as needed
];

const Products = () => {
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = productsData.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Products</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="mt-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border p-4 mb-2">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
