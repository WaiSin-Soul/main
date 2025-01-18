import React from 'react';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-background text-accent">
            <h1 className="text-xl">My Website</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/about" className="hover:underline">About</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header; 