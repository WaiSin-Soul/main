import React from 'react';
import CardImage from './CardImage';
import CardContent from './CardContent';

interface CardProps {
    title: string;
    description: string;
    imageSrc: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc, link }) => {
    return (
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
            <CardImage src={imageSrc} alt={title} />
            <CardContent title={title} description={description} link={link} />
        </div>
    );
};

export default Card; 