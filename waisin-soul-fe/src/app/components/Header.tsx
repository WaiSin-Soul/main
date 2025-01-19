import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-background text-accent">
            <h1 className="text-xl"><Link href="/">LOGO</Link></h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/art" className="hover:underline">Art Collection</Link></li>
                    <li><Link href="/coaching" className="hover:underline">Coaching Services</Link></li>
                    <li><Link href="/products" className="hover:underline">Products</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact Me</Link></li>
                    <li><Link href="/about" className="hover:underline">About Me</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header; 