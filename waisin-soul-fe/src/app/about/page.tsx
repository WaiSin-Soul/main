"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const About = () => {
  const testimonials = [
    {
      name: "Karen K. Redding",
      title: "LCSW, Clinical Psychologist, Ph.D.",
      quote:
        "WaiSin's artwork is not only visually beautiful & psychologically calming, it is powerfully poetic. In this world of uncertainty, one touches a deeper certainty of what truly matters in her representation of both the ephemeral & visual sphere of experience.",
    //   imageUrl:
    //     "https://swweabineuoutbhdferb.supabase.co/storage/v1/object/public/website/headshots/Allens%20cropped%20headshot%205-2-22.jpg"
},
    {
      name: "Dr. Allen Darbonne",
      title: "Clinical Psychologist, Ph.D.",
      quote:
        "Spiritual expressions of positive life energy flowing with Peace, Love and Joy. That's WaiSin, a Master of the Arts!",
        image: "/images/Allens cropped headshot 5-2-22.jpg",
    //   imageUrl:
    //     "https://swweabineuoutbhdferb.supabase.co/storage/v1/object/public/website/headshots/Allens%20cropped%20headshot%205-2-22.jpg"
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // px

    if (distance > minSwipeDistance) {
      // swipe left → next
      nextTestimonial();
    } else if (distance < -minSwipeDistance) {
      // swipe right → previous
      prevTestimonial();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
        About Me
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 bg-[#1a1a1a] rounded-lg shadow-lg p-6 order-2 md:order-1">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-normal tracking-widest mb-8 mt-4 text-white">
                WAISIN TONG-DARBONNE
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                WaiSin Tong-Darbonne is an internationally recognized and
                honored artist.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Her works are cherished by collectors in the United States,
                Europe, Canada, China, Korea, and Japan. She was awarded
                &apos;Best Artist of 2020&apos; in Laguna Beach, CA.; known as
                &apos;The City of Art&apos;. Each of her paintings tells a
                beautiful story that delights the eye and ignites the heart.
              </p>
            </div>
            {/* <div>
                            <h2 className="text-2xl font-semibold mb-4 text-white">Testimonials</h2>
                            <div className="space-y-6">
                                <div className="bg-[#2a2a2a] p-6 rounded-lg relative">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-white">{currentTestimonial.name}</h3>
                                            <p className="text-gray-400">{currentTestimonial.title}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 italic transition-opacity duration-500 mb-10">
                                        &ldquo;{currentTestimonial.quote}&rdquo;
                                    </p>

                                    <div className="absolute bottom-4 right-4 flex items-center gap-3">
                                        <button
                                            onClick={prevTestimonial}
                                            className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                                            aria-label="Previous testimonial"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10.354 3.646a.5.5 0 0 1 0 .708L7.207 7.5l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setIsPaused((prev) => !prev)}
                                            className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                                            aria-label={isPaused ? 'Resume testimonials carousel' : 'Pause testimonials carousel'}
                                        >
                                            {isPaused ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                                                    <path d="M4.5 3.5v9l7-4.5-7-4.5z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
                                                    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={nextTestimonial}
                                            className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                                            aria-label="Next testimonial"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M5.646 3.646a.5.5 0 0 1 .708 0l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L8.793 7.5 5.646 4.354a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Quick Info
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Education
                  </h3>
                  <p className="text-gray-300">
                    Bachelor of Arts
                    <br />
                    Hong Kong College of Education in Arts
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Languages
                  </h3>
                  <p className="text-gray-300">
                    English (Intermediate)
                    <br />
                    Cantonese (Native)
                    <br />
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Interests
                  </h3>
                  <p className="text-gray-300">
                    Photography
                    <br />
                    Cooking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* <h2 className="text-2xl font-semibold mb-4 text-white">Testimonials</h2> */}
        <div className="space-y-6">
          <div className="bg-[#2a2a2a] p-6 rounded-lg relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4 overflow-hidden">
                {currentTestimonial?.image ? (
                  <Image
                    src={`${currentTestimonial?.image}`}
                    alt={currentTestimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-400">{currentTestimonial.title}</p>
              </div>
            </div>
            <p className="text-gray-300 italic transition-opacity duration-500 mb-10">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>

            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.354 3.646a.5.5 0 0 1 0 .708L7.207 7.5l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.646 3.646a.5.5 0 0 1 .708 0l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L8.793 7.5 5.646 4.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
