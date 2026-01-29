import React from 'react';

interface CardContentProps {
    title: string;
    description: string;
    link: string;
}

const CardContent: React.FC<CardContentProps> = ({ title, description, link }) => {
    return (
        <div className="p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-bold mb-2 text-black">{title}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
            </div>
            <a
                href={link}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-center"
            >
                Click Here
            </a>
            {link.includes("/coaching") && <p className="text-sm text-gray-500 mt-2">FOR 30-MINS CLARITY SESSION</p>}
        </div>
    );
};

export default CardContent; 