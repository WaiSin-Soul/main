"use client"
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Image from 'next/image';

const productsData = [
    { 
        id: 1, 
        name: 'Product 1', 
        description: 'Description for product 1',
        price: '$99.99',
        image: '/product1.jpg'
    },
    { 
        id: 2, 
        name: 'Product 2', 
        description: 'Description for product 2',
        price: '$149.99',
        image: '/product2.jpg'
    },
    { 
        id: 3, 
        name: 'Product 3', 
        description: 'Description for product 3',
        price: '$199.99',
        image: '/product3.jpg'
    },
    // Add more products as needed
];

const Products = () => {
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = productsData.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            product.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Products</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                                <span className="text-blue-500 font-bold">{product.price}</span>
                            </div>
                            <p className="text-gray-300 mb-4">{product.description}</p>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="text-center text-gray-300 mt-8">
                    No products found matching your search.
                </div>
            )}
        </div>
    );
};

export default Products;
