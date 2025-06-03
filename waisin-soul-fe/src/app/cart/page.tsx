"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Cart = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Shipping & Payment Form */}
                <div className="space-y-8">
                    {/* Shipping Information */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-[#1a1a1a] rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Payment Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name on Card</label>
                            <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    className="w-full p-3 bg-[#2a2a2a] border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="bg-[#1a1a1a] rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Order Summary</h2>
                    <div className="space-y-4">
                        {/* Sample Order Items */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/product1.jpg"
                                    alt="Product"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-medium">Product Name</h3>
                                <p className="text-gray-400">$99.99</p>
                            </div>
                            <button className="text-red-500 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>

                        {/* Order Totals */}
                        <div className="border-t border-gray-700 pt-4 mt-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-300">Subtotal</span>
                                <span className="text-white">$99.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-300">Shipping</span>
                                <span className="text-white">$5.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-300">Tax</span>
                                <span className="text-white">$8.50</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-gray-700">
                                <span className="text-white">Total</span>
                                <span className="text-white">$113.49</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 mt-6">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;