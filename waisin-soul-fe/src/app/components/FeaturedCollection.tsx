'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedItem {
    id?: string;
    title: string;
    price: string;
    imageSrc: string;
}

const FeaturedCollection: React.FC<{ items: FeaturedItem[] }> = ({ items }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-kalam">Featured Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl">
                {items.map((item, index) => {
                    // const productId = item.id || `product-${index}`;
                    return (
                        <Link 
                            key={index} 
                            href={`/products/${item.id}`}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <Image
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                src={item.imageSrc}
                                alt={item.title}
                                width={300}
                                height={200}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                <p className="text-gray-700">{item.price}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <a href="/art/collection" className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                View all
            </a>
        </div>
    );
};

export default FeaturedCollection; 