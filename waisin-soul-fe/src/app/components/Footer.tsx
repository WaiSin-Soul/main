import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="flex flex-col items-center p-8 bg-background text-accent">
            <div className="text-center mb-4">
                <h2 className="text-lg font-bold">Subscribe to our emails</h2>
                <div className="flex items-center justify-center mt-2">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-l-md"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-r-md">→</button>
                </div>
            </div>
            <div className="text-center mb-4 text-black">
                <p>Country/region</p>
                <select className="mt-2 p-2 border border-gray-300 rounded-md">
                    <option value="CAD">CAD $ | Canada</option>
                    {/* Hook up to db to render these and set automatically*/}
                </select>
            </div>
            <div className="flex justify-center mb-4">
                <a href="#" className="mx-2">Follow on shop</a>
                <Image width={100} height={100} src="/images/footer/facebook.png" alt="facebook" className="h-6 w-6" />
                <Image width={100} height={100} src="/images/footer/instagram.png" alt="instagram" className="h-6 w-6" />
            </div>
            <div className="text-center">
                <p className="mb-2">© {new Date().getFullYear()} WaiSin Soul. All rights reserved.</p>
                <div className="flex justify-center space-x-2">
                    <Image width={100} height={100} src="/images/footer/amex.png" alt="Amex" className="h-6 w-6" />
                    <Image width={100} height={100} src="/images/footer/visa.png" alt="Visa" className="h-6 w-6" />
                    <Image width={100} height={100} src="/images/footer/mastercard.png" alt="MasterCard" className="h-6 w-6" />
                    <Image width={100} height={100} src="/images/footer/paypal.png" alt="PayPal" className="h-6 w-6" />
                    {/* Add the other payment icons */}
                </div>
            </div>
        </footer>
    );
};

export default Footer; 