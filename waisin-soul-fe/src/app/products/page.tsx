"use client"
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';

type BackendProduct = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
};

const Products = () => {
    const [allProducts, setAllProducts] = useState<BackendProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<BackendProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/admin/products?collection=products');

                if (!response.ok) {
                    throw new Error('Failed to load products');
                }

                const data: BackendProduct[] = await response.json();
                setAllProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            (product.description ?? '').toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-white">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">Products</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={product.image_url || '/images/feature1.webp'}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                                <span className="text-blue-500 font-bold">${product.price.toFixed(2)}</span>
                            </div>
                            <p className="text-gray-300 mb-4">{product.description}</p>
                            <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center">
                                View Details
                            </div>
                        </div>
                    </Link>
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
