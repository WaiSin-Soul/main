"use client"
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Image from 'next/image';
import Link from 'next/link';

type Artwork = {
    id: string;
    name: string;
    description: string | null;
    price?: number;
    image_url: string | null;
    collection: string;
    basePrice?: number;
};

const Flora_Fauna = () => {
    const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
    const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('/api/admin/products?collection=flora-fauna');
                if (!response.ok) {
                    throw new Error('Failed to load artworks');
                }
                const data: Artwork[] = await response.json();
                setAllArtworks(data);
                setFilteredArtworks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load artworks');
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, []);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = allArtworks.filter(artwork =>
            artwork.name.toLowerCase().includes(lowercasedQuery) ||
            (artwork.description ?? '').toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArtworks(filtered);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-white">
                Loading artworks...
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
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">Flora & Fauna</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map(artwork => (
                    <Link
                        key={artwork.id}
                        href={`/art/flora-fauna/${artwork.id}`}
                        className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={artwork.image_url || '/images/feature1.webp'}
                                alt={artwork.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{artwork.name}</h2>
                                <span className="text-blue-500 font-bold">${(artwork.price || artwork.basePrice || 0).toFixed(2)}</span>
                            </div>
                            <p className="text-gray-300 mb-4">{artwork.description}</p>
                            <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center">
                                View Details
                            </div>
                        </div>
                    </Link>
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

export default Flora_Fauna; 