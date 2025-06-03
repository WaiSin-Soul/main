import React from 'react';

const Coaching = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Coaching Services</h1>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Tier Card */}
                <div className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Free Consultation</h2>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$0</span>
                            <span className="text-gray-400">/session</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                30-minute initial consultation
                            </li>
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Basic assessment
                            </li>
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                General guidance
                            </li>
                        </ul>
                        <button className="w-full bg-[#2a2a2a] text-white py-3 px-6 rounded-md hover:bg-[#3a3a3a] transition-colors duration-200">
                            Book Free Session
                        </button>
                    </div>
                </div>

                {/* Premium Tier Card */}
                <div className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden border-2 border-blue-500">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-white">Premium Session</h2>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Popular</span>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$120</span>
                            <span className="text-gray-400">/session</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                120-minute comprehensive session
                            </li>
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Detailed personalized plan
                            </li>
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Follow-up support
                            </li>
                            <li className="flex items-center text-gray-300">
                                <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Resource materials
                            </li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Book Premium Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coaching;
