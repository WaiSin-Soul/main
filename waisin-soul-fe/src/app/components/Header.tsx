"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-header text-white relative">
            <div className="flex items-center space-x-8 mx-auto">
                <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
                </button>
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
            </div>
            <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-header w-full md:w-auto top-16 left-0`}>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
                    <li className="relative">
                        <button onClick={toggleDropdown} className="hover:underline focus:outline-none">
                            <div className="flex flex-row">
                                Art Collection
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                            </div>
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
                    <li><Link href="/about" className="hover:underline">About Me</Link></li>
                </ul>
            </nav>
            <div className="flex space-x-4">
                <button className="hover:underline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg></button>
                <Link href="/login" className="hover:underline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg></Link>
                <Link href="/cart" className="hover:underline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/></svg></Link>
            </div>
        </header>
    );
};

export default Header;