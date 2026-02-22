import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">About Me</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 bg-[#1a1a1a] rounded-lg shadow-lg p-6 order-2 md:order-1">
                    <div className="space-y-6">
                        <div>
                            <h2 className='text-3xl font-normal tracking-widest mb-8 mt-4 text-white'>WAISIN TONG-DARBONNE</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                WaiSin Tong-Darbonne is an internationally recognized and honored artist.
                            </p>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Her works are cherished by collectors in the United States, Europe, Canada, China, Korea, and Japan.
                                She was awarded &apos;Best Artist of 2020&apos; in Laguna Beach, CA.; known as &apos;The City of Art&apos;.
                                Each of her paintings tells a beautiful story that delights the eye and ignites the heart.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-white">Testimonials</h2>
                            <div className="space-y-6">
                                <div className="bg-[#2a2a2a] p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-white">Karen K. Redding</h3>
                                            <p className="text-gray-400">LCSW, Clinical Psychologist, Ph.D.</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic">
                                        &ldquo;WaiSin&apos;s artwork is not only visually beautiful & psychologically calming, it is powerfully poetic. In this world of uncertainty, one touches a deeper certainty of what truly matters in her representation of both the ephemeral & visual sphere of experience.&rdquo;
                                    </p>
                                </div>
                                <div className="bg-[#2a2a2a] p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-white">Dr. Allen Darbonne</h3>
                                            <p className="text-gray-400">Doctor</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic">
                                        &ldquo;Spiritual expressions of positive life energy flowing with Peace, Love and Joy. That&apos;s WaiSin, a Master of the Arts!&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aside */}
                <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 order-1 md:order-2">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden">
                                <Image
                                    src="/images/about/waisin-headshot.jpg"
                                    alt="Profile Picture"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-white">Quick Info</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">Education</h3>
                                    <p className="text-gray-300">
                                        Bachelor of Arts<br />
                                        Hong Kong College of Education in Arts
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">Languages</h3>
                                    <p className="text-gray-300">
                                        English (Intermediate)<br />
                                        Cantonese (Native)<br />
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">Interests</h3>
                                    <p className="text-gray-300">
                                        Photography<br />
                                        Cooking
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;