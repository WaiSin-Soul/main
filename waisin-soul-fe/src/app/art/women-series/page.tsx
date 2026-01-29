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

const womenSeriesData: Product[] = [
    { 
        id: 1, 
        name: 'Women Series 1', 
        description: 'Description for women series artwork 1',
        price: '$329.99',
        image: '/images/feature1.webp',
        details: 'Empowering artwork celebrating the strength and beauty of women.'
    },
    { 
        id: 2, 
        name: 'Women Series 2', 
        description: 'Description for women series artwork 2',
        price: '$379.99',
        image: '/images/feature2.webp',
        details: 'Elegant portrayal of feminine grace and cultural heritage.'
    },
    { 
        id: 3, 
        name: 'Women Series 3', 
        description: 'Description for women series artwork 3',
        price: '$429.99',
        image: '/images/feature3.webp',
        details: 'Powerful artwork depicting women across different cultures and time periods.'
    },
];

const Women_Series = () => {
    const [filteredArtworks, setFilteredArtworks] = useState<Product[]>(womenSeriesData);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = womenSeriesData.filter(artwork =>
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
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Women Series</h1>
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

export default Women_Series;