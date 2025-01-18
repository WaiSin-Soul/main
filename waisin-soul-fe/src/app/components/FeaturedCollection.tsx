import React from 'react';
import Image from 'next/image';

interface FeaturedItem {
    title: string;
    price: string;
    imageSrc: string;
}

const FeaturedCollection: React.FC<{ items: FeaturedItem[] }> = ({ items }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Featured Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Image
                            className="w-full h-48 object-cover"
                            src={item.imageSrc}
                            alt={item.title}
                            width={300}
                            height={200}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-700">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <a href="/collection" className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                View all
            </a>
        </div>
    );
};

export default FeaturedCollection; 