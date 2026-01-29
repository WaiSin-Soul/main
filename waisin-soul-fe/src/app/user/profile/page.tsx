"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const { user, isAuthenticated, logout, updateUserInfo } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingSettings, setIsEditingSettings] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    useEffect(() => {
        setIsLoading(false);
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                zipCode: user.zipCode || '',
                country: user.country || ''
            });
        }
    }, [isAuthenticated, user, router]);

    if (isLoading) {
        return <div className="min-h-screen bg-background text-white flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveSettings = () => {
        updateUserInfo(formData);
        setIsEditingSettings(false);
    };

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

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Account</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
                
                {/* Profile Header */}
                <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-gray-400">{user.email}</p>
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
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Account Settings</h3>
                                <button
                                    onClick={() => {
                                        if (isEditingSettings) {
                                            setFormData({
                                                name: user.name || '',
                                                email: user.email || '',
                                                phone: user.phone || '',
                                                address: user.address || '',
                                                city: user.city || '',
                                                state: user.state || '',
                                                zipCode: user.zipCode || '',
                                                country: user.country || ''
                                            });
                                        }
                                        setIsEditingSettings(!isEditingSettings);
                                    }}
                                    className={`px-4 py-2 rounded-lg ${
                                        isEditingSettings
                                            ? 'bg-gray-600 hover:bg-gray-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white transition-colors`}
                                >
                                    {isEditingSettings ? 'Cancel' : 'Edit'}
                                </button>
                            </div>
                            {isEditingSettings ? (
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4">Billing Address</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                                        ZIP Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="zipCode"
                                                        value={formData.zipCode}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditingSettings(false)}
                                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveSettings}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Name</p>
                                            <p className="text-white">{formData.name || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Email</p>
                                            <p className="text-white">{formData.email || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">Phone</p>
                                            <p className="text-white">{formData.phone || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4 mt-6">Billing Address</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Address</p>
                                                <p className="text-white">{formData.address || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">City</p>
                                                <p className="text-white">{formData.city || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">State</p>
                                                <p className="text-white">{formData.state || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">ZIP Code</p>
                                                <p className="text-white">{formData.zipCode || 'Not set'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Country</p>
                                                <p className="text-white">{formData.country || 'Not set'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-700">
                                        <button
                                            type="button"
                                            onClick={() => handleLogout()}
                                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 