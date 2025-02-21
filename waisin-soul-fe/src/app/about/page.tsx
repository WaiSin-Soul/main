import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen p-4">
            <div className="max-w-6xl w-full mx-auto">
                <h1 className="text-2xl font-bold mb-8">About Me</h1>
                <div className='flex gap-16'>
                    <Image 
                        className="w-1/2 h-auto object-cover" 
                        src="/images/about/waisin-headshot.jpg" 
                        alt="Waisin Tong-Darbonne" 
                        width={600} 
                        height={300} 
                    />
                    <article className="w-1/2">
                        <h2 className='text-3xl font-normal tracking-widest mb-8 mt-4'>WAISIN TONG-DARBONNE</h2>
                        <p className="mb-6">
                            WaiSin Tong-Darbonne is an internationally recognized and honored artist.
                        </p>
                        <p className="mb-6">
                            Her works are cherished by collectors in the United States, Europe, Canada, China, Korea, and Japan.
                            She was awarded &apos;Best Artist of 2020&apos; in Laguna Beach, CA.; known as &apos;The City of Art&apos;.
                            Each of her paintings tells a beautiful story that delights the eye and ignites the heart.
                        </p>
                        <div className="text-center my-8">~~~~~~~~~</div>
                        <p className="mb-6">
                            &quot;WaiSin&apos;s artwork is not only visually beautiful & psychologically calming, it is powerfully poetic. In this world of uncertainty, one touches a deeper certainty of what truly matters in her representation of both the ephemeral & visual sphere of experience.&quot;
                        </p>
                        <p className="italic mb-6">Karen K. Redding, LCSW, Clinical Psychologist, Ph.D.</p>
                        <p className="mb-6">
                            &quot;Spiritual expressions of positive life energy flowing with Peace, Love and Joy. That&apos;s WaiSin, a Master of the Arts!&quot;
                        </p>
                        <p className="italic">Dr. Allen Darbonne</p>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default About;
