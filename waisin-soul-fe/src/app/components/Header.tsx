"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-header text-white relative">
            <div className="flex items-center space-x-8 mx-auto">
                <h1 className="text-xl font-bold">
                    <Link href="/">
                        <Image
                            className="w-1/2 h-auto object-cover"
                            src="/images/waisin_soul_logo.png"
                            alt="logo"
                            width={600}
                            height={300}
                        />
                    </Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li className="relative">
                            <button onClick={toggleDropdown} className="hover:underline focus:outline-none">
                                Art Collection
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md z-10">
                                    <li><Link href="/art/best-sellers" className="block px-4 py-2 hover:bg-gray-200">Best Sellers</Link></li>
                                    <li><Link href="/art/landscapes" className="block px-4 py-2 hover:bg-gray-200">Landscapes</Link></li>
                                    <li><Link href="/art/caligraphy" className="block px-4 py-2 hover:bg-gray-200">Calligraphy & Contemporary</Link></li>
                                    <li><Link href="/art/flora-fauna" className="block px-4 py-2 hover:bg-gray-200">Flora & Fauna</Link></li>
                                    <li><Link href="/art/women-series" className="block px-4 py-2 hover:bg-gray-200">Women Series</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link href="/coaching" className="hover:underline">Coaching Services</Link></li>
                        <li><Link href="/products" className="hover:underline">Products</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact Me</Link></li>
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="flex space-x-4">
                <button className="hover:underline">Search</button>
                <Link href="/login" className="hover:underline">Login</Link>
                <Link href="/cart" className="hover:underline">Cart</Link>
            </div>
        </header>
    );
};

export default Header;