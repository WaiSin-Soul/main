import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
    src: string;
    alt: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setProgress(0);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        setProgress(0);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    nextSlide();
                    return 0;
                }
                return prevProgress + 1;
            });
        }, 50); // Update progress every 50ms for smooth animation

        return () => clearInterval(timer);
    }, [currentIndex, nextSlide]);

    return (
        <div className="relative w-full h-[280px] sm:h-[420px] lg:h-[600px] bg-gray-100">
            <div className="overflow-hidden h-full relative flex items-center justify-center">
                <Image
                    className="h-full w-full object-cover"
                    src={items[currentIndex].src}
                    alt={items[currentIndex].alt}
                    width={1920}
                    height={1080}
                />
                {/* Progress bar */}
                {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-50"
                        style={{ width: `${progress}%` }}
                    />
                </div> */}
            </div>
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white p-6 rounded-full transition-all z-10"
                aria-label="Previous Slide"
            >
                &#10094;
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white p-6 rounded-full transition-all z-10"
                aria-label="Next Slide"
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel; 