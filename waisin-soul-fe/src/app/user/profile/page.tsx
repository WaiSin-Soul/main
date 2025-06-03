"use client"
import React, { useState } from 'react';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('orders');

    // Sample order data
    const orders = [
        {
            id: 'ORD001',
            date: '2024-03-15',
            total: 299.99,
            status: 'Delivered',
            items: [
                { name: 'Mountain Landscape', price: 199.99, quantity: 1 },
                { name: 'Calligraphy Set', price: 100.00, quantity: 1 }
            ]
        },
        {
            id: 'ORD002',
            date: '2024-03-10',
            total: 150.00,
            status: 'Processing',
            items: [
                { name: 'Flora & Fauna Print', price: 150.00, quantity: 1 }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Account</h1>
                
                {/* Profile Header */}
                <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">John Doe</h2>
                            <p className="text-gray-400">john.doe@example.com</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 rounded-lg ${
                            activeTab === 'orders' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                        }`}
                    >
                        Order History
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 rounded-lg ${
                            activeTab === 'settings' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]'
                        }`}
                    >
                        Account Settings
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-[#2a2a2a] rounded-lg p-6">
                    {activeTab === 'orders' ? (
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Order History</h3>
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-700 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <p className="text-gray-400">Order #{order.id}</p>
                                                <p className="text-gray-400">{order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${order.total.toFixed(2)}</p>
                                                <p className={`text-sm ${
                                                    order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
                                                }`}>
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-gray-400">${item.price.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            defaultValue="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            defaultValue="Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            defaultValue="john.doe@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            defaultValue="+1 (555) 123-4567"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                        defaultValue="123 Main St, City, State 12345"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 