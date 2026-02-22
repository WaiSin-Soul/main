"use client";
import React from 'react';
import Image from 'next/image';

type Artwork = {
    id: string;
    name: string;
    description: string | null;
    price?: number;
    image_url: string | null;
    collection: string;
    basePrice?: number;
};

interface ArtworkModalProps {
    artwork: Artwork | null;
    onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
    if (!artwork) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Full Image */}
                    <div className="relative w-full h-96 md:h-[500px]">
                        <Image
                            src={artwork.image_url || '/images/feature1.webp'}
                            alt={artwork.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-3xl font-bold text-white mb-4">{artwork.name}</h2>
                        <p className="text-gray-300 text-lg mb-6">{artwork.description}</p>
                        {/* {artwork.price && (
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-blue-400">
                                    ${artwork.price.toFixed(2)}
                                </span>
                                Add to cart or other actions can go here
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkModal;
