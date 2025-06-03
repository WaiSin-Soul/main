"use client"
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Image from 'next/image';

const landscapesData = [
    { 
        id: 1, 
        name: 'Landscape 1', 
        description: 'Description for landscape 1',
        price: '$249.99',
        image: '/product1.jpg'
    },
    { 
        id: 2, 
        name: 'Landscape 2', 
        description: 'Description for landscape 2',
        price: '$299.99',
        image: '/product2.jpg'
    },
    { 
        id: 3, 
        name: 'Landscape 3', 
        description: 'Description for landscape 3',
        price: '$349.99',
        image: '/product3.jpg'
    },
];

const Landscapes = () => {
    const [filteredArtworks, setFilteredArtworks] = useState(landscapesData);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = landscapesData.filter(artwork =>
            artwork.name.toLowerCase().includes(lowercasedQuery) ||
            artwork.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArtworks(filtered);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Landscapes</h1>
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
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
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
        </div>
    );
};

export default Landscapes; 