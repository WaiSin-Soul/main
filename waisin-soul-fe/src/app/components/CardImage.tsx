import React from 'react';
import Image from 'next/image';

interface CardImageProps {
    src: string;
    alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt }) => {
    return (
        <Image
            className="w-1/2 h-auto object-cover"
            src={src}
            alt={alt}
            width={600}
            height={300}
        />
    );
};

export default CardImage; 