"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const router = useRouter();

    const { getTotalItems } = useCart();
    const { isAuthenticated } = useAuth();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
    };

    const handleNavigate = (href: string) => {
        // Close dropdown when navigating
        setDropdownOpen(false);
        setMenuOpen(false);
        setSearchOpen(false);
        router.push(href);
    };

    const handleUserClick = () => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            router.push('/user/profile');
        }
    };

    const cartCount = getTotalItems();

    return (
        <header className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4 bg-header text-white relative">
            <div className="flex items-center gap-x-4 sm:gap-x-8">
                <h1 className="text-xl font-bold">
                    <Link href="/" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                        <Image
                            className="w-40 sm:w-56 h-auto object-contain"
                            src="/images/waisin_soul_logo.png"
                            alt="logo"
                            width={300}
                            height={100}
                        />
                    </Link>
                </h1>
                <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>
            </div>
            <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-header w-full md:w-auto top-16 left-0 z-20`}>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-12 p-4 md:p-0">
                    <li className="relative">
                        <button onClick={toggleDropdown} className="hover:underline focus:outline-none">
                            <div className="flex flex-row">
                                <span className="text-2xl">Art Collection</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </div>
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md z-10">
                                <li><button onClick={() => handleNavigate('/art/best-sellers')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Best Sellers</button></li>
                                <li><button onClick={() => handleNavigate('/art/landscapes')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Landscapes</button></li>
                                <li><button onClick={() => handleNavigate('/art/calligraphy-contemporary')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Calligraphy & Contemporary</button></li>
                                <li><button onClick={() => handleNavigate('/art/flora-fauna')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Flora & Fauna</button></li>
                                <li><button onClick={() => handleNavigate('/art/women-series')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">Women Series</button></li>
                                <li><button onClick={() => handleNavigate('/art/collection')} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">View All</button></li>
                            </ul>
                        )}
                    </li>
                    <li><button onClick={() => handleNavigate('/coaching')} className="hover:underline"><span className="text-2xl">Coaching</span></button></li>
                    <li><button onClick={() => handleNavigate('/products')} className="hover:underline"><span className="text-2xl">Products</span></button></li>
                    <li><button onClick={() => handleNavigate('/contact')} className="hover:underline"><span className="text-2xl">Contact Me</span></button></li>
                    <li><button onClick={() => handleNavigate('/about')} className="hover:underline"><span className="text-2xl">About Me</span></button></li>
                </ul>
            </nav>
            <div className="flex space-x-4 sm:space-x-6">
                <button className="hover:underline" onClick={toggleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>
                </button>
                <button onClick={handleUserClick} className="hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>
                </button>
                {/* <Link href="/cart" className="hover:underline relative" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-background text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link> */}
            </div>
            {isSearchOpen && (
                <div className="absolute top-32 left-0 right-0 p-4 z-20">
                    <div className="max-w-4xl mx-auto">
                        <SearchBar onSearch={(query) => console.log(query)} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;