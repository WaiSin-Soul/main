import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">Contact Me</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content - Contact Form */}
                <div className="md:col-span-2 bg-[#1a1a1a] rounded-lg shadow-lg p-6">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Aside - Contact Information */}
                <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Location</h3>
                            <p className="text-gray-300">
                                123 Business Street<br />
                                City, State 12345<br />
                                United States
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Email</h3>
                            <p className="text-gray-300">
                                <a href="mailto:contact@example.com" className="hover:text-blue-400">
                                    contact@example.com
                                </a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
                            <p className="text-gray-300">
                                <a href="tel:+1234567890" className="hover:text-blue-400">
                                    (123) 456-7890
                                </a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Social Media</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-blue-400">
                                    Facebook
                                </a>
                                <a href="#" className="text-gray-300 hover:text-blue-400">
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
