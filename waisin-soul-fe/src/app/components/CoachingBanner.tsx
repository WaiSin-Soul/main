import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CoachingBanner = () => {
  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16">
      <div className="bg-[#B84141] rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px]">
            <Image
              src="/images/red-bird.webp"
              alt="Red Cardinals in Snow"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
            <h2 className="text-3xl md:text-4xl font-cursive mb-6">
              Love Relationship Coaching
            </h2>
            <p className="mb-8 text-lg">
              If you are currently in a relationship or seeking for one,
              and if you are not experiencing the deep soulmate love
              that you are desiring, it is not your fault.
            </p>
            <p className="mb-8 text-lg">
              Do you want to be absolutely clear about what is
              blocking you? Let's go ahead and do a quick 30-minute call.
            </p>
            <Link 
              href="/coaching/clarity-session"
              className="inline-block"
            >
              <button className="bg-[#1A1A1A] text-white px-8 py-3 rounded-full hover:bg-[#2A2A2A] transition-colors duration-300">
                Click Here
              </button>
            </Link>
            <p className="mt-4 text-sm font-light">
              FOR 30-MIN CLARITY SESSION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingBanner; 