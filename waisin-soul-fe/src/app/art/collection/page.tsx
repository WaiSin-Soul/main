"use client"
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Image from 'next/image';
import ProductModal from '../../components/ProductModal';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    details: string;
}

const collectionData: Product[] = [
    { 
        id: 1, 
        name: 'Collection 1', 
        description: 'Description for collection 1',
        price: '$299.99',
        image: '/images/feature1.webp',
        details: 'Premium collection piece showcasing exceptional artistry and craftsmanship.'
    },
    { 
        id: 2, 
        name: 'Collection 2', 
        description: 'Description for collection 2',
        price: '$349.99',
        image: '/images/feature2.webp',
        details: 'Exclusive collection featuring unique and limited edition artwork.'
    },
    { 
        id: 3, 
        name: 'Collection 3', 
        description: 'Description for collection 3',
        price: '$399.99',
        image: '/images/feature3.webp',
        details: 'Curated collection representing the finest works of contemporary art.'
    },
];

const Collection = () => {
    const [filteredCollection, setFilteredCollection] = useState<Product[]>(collectionData);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = collectionData.filter(collection =>
            collection.name.toLowerCase().includes(lowercasedQuery) ||
            collection.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredCollection(filtered);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Collection</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollection.map(artwork => (
                    <div key={artwork.id} className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 w-full">
                            <Image
                                src={artwork.image}
                                alt={artwork.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{artwork.name}</h2>
                                <span className="text-blue-500 font-bold">{artwork.price}</span>
                            </div>
                            <p className="text-gray-300 mb-4">{artwork.description}</p>
                            <button 
                                onClick={() => handleViewDetails(artwork)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {filteredCollection.length === 0 && (
                <div className="text-center text-gray-300 mt-8">
                    No artworks found matching your search.
                </div>
            )}

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
            />
        </div>
    );
};

export default Collection;
