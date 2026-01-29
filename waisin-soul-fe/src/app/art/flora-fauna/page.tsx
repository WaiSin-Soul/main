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

const floraFaunaData: Product[] = [
    { 
        id: 1, 
        name: 'Flora 1', 
        description: 'Description for flora artwork 1',
        price: '$179.99',
        image: '/images/feature1.webp',
        details: 'Beautiful botanical art featuring delicate flora specimens with intricate details.'
    },
    { 
        id: 2, 
        name: 'Fauna 1', 
        description: 'Description for fauna artwork 1',
        price: '$229.99',
        image: '/images/feature2.webp',
        details: 'Wildlife artwork capturing the essence and beauty of natural fauna.'
    },
    { 
        id: 3, 
        name: 'Flora 2', 
        description: 'Description for flora artwork 2',
        price: '$279.99',
        image: '/images/feature3.webp',
        details: 'Exquisite flora composition with vibrant colors and botanical precision.'
    },
];

const Flora_Fauna = () => {
    const [filteredArtworks, setFilteredArtworks] = useState<Product[]>(floraFaunaData);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = floraFaunaData.filter(artwork =>
            artwork.name.toLowerCase().includes(lowercasedQuery) ||
            artwork.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArtworks(filtered);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Flora & Fauna</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map(artwork => (
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
            {filteredArtworks.length === 0 && (
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

export default Flora_Fauna; 