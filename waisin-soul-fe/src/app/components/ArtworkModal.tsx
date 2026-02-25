"use client";
import React, { useEffect, useState } from 'react';
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
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleClose = () => {
        setIsFullScreen(false);
        setZoomLevel(1);
        onClose();
    };

    useEffect(() => {
        if (!isFullScreen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFullScreen(false);
                setZoomLevel(1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullScreen]);

    if (!artwork) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <div 
                className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={handleClose}
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
                    <div
                        className="relative w-full h-96 md:h-[500px] cursor-zoom-in"
                        onClick={() => {
                            setZoomLevel(1);
                            setIsFullScreen(true);
                        }}
                    >
                        <Image
                            src={artwork.image_url || '/images/feature1.webp'}
                            alt={artwork.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-contain transition-transform duration-300"
                        />
                    </div>
                    <div className="px-6 md:px-8 pt-2 text-xs text-gray-400">
                        Click the image to view full screen.
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
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsFullScreen(false);
                        setZoomLevel(1);
                    }}
                >
                    <div
                        className="relative w-full h-full max-w-6xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <button
                                onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.25))}
                                className="bg-black/70 hover:bg-black/90 text-white rounded-full px-3 py-2 text-sm transition-colors"
                                aria-label="Zoom out"
                            >
                                -
                            </button>
                            <button
                                onClick={() => setZoomLevel(1)}
                                className="bg-black/70 hover:bg-black/90 text-white rounded-full px-3 py-2 text-sm transition-colors"
                                aria-label="Reset zoom"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                                className="bg-black/70 hover:bg-black/90 text-white rounded-full px-3 py-2 text-sm transition-colors"
                                aria-label="Zoom in"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setIsFullScreen(false);
                                setZoomLevel(1);
                            }}
                            className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors"
                            aria-label="Close full screen"
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
                        <Image
                            src={artwork.image_url || '/images/feature1.webp'}
                            alt={artwork.name}
                            fill
                            sizes="100vw"
                            className="object-contain transition-transform duration-200"
                            style={{ transform: `scale(${zoomLevel})` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtworkModal;
