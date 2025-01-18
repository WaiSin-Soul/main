import React, { useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        { src: '/image1.jpg', alt: 'Image 1' },
        { src: '/image2.jpg', alt: 'Image 2' },
        { src: '/image3.jpg', alt: 'Image 3' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto h-3/4">
            <div className="overflow-hidden rounded-lg h-full">
                <Image
                    className="w-full h-full object-cover"
                    src={items[currentIndex].src}
                    alt={items[currentIndex].alt}
                    width={600}
                    height={400}
                />
            </div>
            <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                &#10094; {/* Left Arrow */}
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                &#10095; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default Carousel; 