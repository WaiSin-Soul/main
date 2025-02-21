import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-5 gap-8">
                {/* Info Column */}
                <div className='space-y-2'>
                    <Link href="/">
                        <Image
                            className="w-3/4 h-auto object-cover"
                            src="/images/waisin_soul_logo.png"
                            alt="logo"
                            width={300}
                            height={100}
                        />
                    </Link>
                    <div className="text-sm space-y-2">
                        <p>Waisin Tong-Darbonne</p>
                        <p>Artist</p>
                        <p>© 2025 All Rights Reserved</p>
                    </div>
                </div>

                {/* Contact Column */}
                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <div className="text-sm">
                        <Link href='/contact'>Contact Us</Link>
                    </div>
                </div>

                {/* Resources Column */}
                <div>
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <div className="text-sm space-y-2 flex flex-col">
                        <Link href="/about">About the artist</Link>
                        <Link href="/coaching">Coaching</Link>
                    </div>
                </div>

                {/* Stay Updated Column */}
                <div>
                    <h3 className="font-semibold mb-4">Stay Updated</h3>
                    <div className="text-sm space-y-2 flex flex-col">
                        <a href='https://www.facebook.com/'>Facebook</a>
                        <a href='https://www.instagram.com/'>Instagram</a>
                    </div>
                </div>

                {/* Email Sub Column */}
                <div>
                    <h3 className="font-semibold mb-4">Subscribe</h3>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 bg-transparent border border-white rounded mb-2 text-sm"
                    />
                    <button className="w-full bg-white text-black py-2 px-4 rounded text-sm">
                        SIGN UP
                    </button>
                    <p className="text-xs mt-2">
                        I&apos;d like to receive exclusive discounts and the latest information.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 