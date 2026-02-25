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
    {
      name: "Carol Lee",
      title: "New Zealand",
      quote:
        "Words cannot express how much I appreciate you for helping our marriage relationship. Communication with my husband is so much better now. We have learned so much from you about how to express respect to the other person. Coming from a Chinese background, learning how to be safe and comfortable expressing feelings with each other was a new perspective that is so important! I understand more about Unconditional Love and Speaking with good Intentions. We’ve stopped the endless arguing and dumping emotions to each other. You are a blessing by helping so many people to be more positive and happy in their life.",
    },
    {
      name: "Tak Wah",
      title: "Hong Kong",
      quote:
        "WaiSin is a soft, gentle, and understanding person, but she takes a strong stand for each client. She tries to understand the person in their shoes. She is open and flexible to new ideas. She cares deeply about her clients!. She can  see the positive sides of not so good situations and helps you turn mistakes and misunderstandings into steppingstones to a wonderful life",
    },
    {
      name: "Tak-Shun",
      title: "LA-US",
      quote:
        "WaiSin has a deep heartfelt desire of ability to help others have the life they dream of. She really listened to me. She finds out what your real issue is so that you can truly create change in your life. Her Superpower is in being patient, putting herself in your shoes, and then helping you see from inside the shoes of your spouse, so you can have a true connection. As a Chinese woman in America for many years, I’m so grateful for her help :)",
    },
    {
      name: "Jianmin Wu",
      title: "LA-US",
      quote:
        "I appreciate WaiSin so much for her deep Chinese wisdom combined with an open-minded Western perspective. WaiSin is the one who always has an incredible outlook on the possibilities no matter what one faces. Her attitude about life and her unconditional love and relationships is over and beyond anything I have ever experienced. Her commitment to success is ongoing, she’s committed to learning-Never give upShe’s open-minded and a big heart person who has a gift that includes speaking the truth and empowering those around her with words that people need to hear. WaiSin is a terrific & excellent listener, she seeks to understand goals and passions that inspire people to be successful in reaching their goals. She is a natural at encouraging others, always being the person who is so willing to just step in there and respond when people need help. She operates from the heart with compassion, caring, and wisdom to direct others in difficult times of life to step out of the darkness. Most importantly, she challenges you to look inside yourself and find things that were hindering your personal growth, Always with her soft-spoken skill, so you're not feel paused. She sees the beauty and the gifts in YOU before you see it. She stands with you to be the best in you. Thank you :) WaiSin!",
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
      // swipe left → next testimonial
      nextTestimonial();
    } else if (distance < -minSwipeDistance) {
      // swipe right → previous testimonial
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/waisin and art.JPG"
                  alt="Waisin standing in front of her art in her previous studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/waisin drawing.jpg"
                  alt="Waisin painting"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
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
                  sizes="192px"
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
        className="mt-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Testimonials
        </h2>

        {/* Desktop View - All testimonials on same page with masonry layout */}
        <div className="hidden md:block">
          <div className="columns-1 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] p-6 rounded-lg flex flex-col break-inside-avoid"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
                    {testimonial?.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
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
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Carousel with one testimonial */}
        <div className="md:hidden mb-6">
          <div className="bg-[#2a2a2a] p-6 rounded-lg flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
                {testimonials[currentTestimonialIndex]?.image ? (
                  <Image
                    src={testimonials[currentTestimonialIndex].image}
                    alt={testimonials[currentTestimonialIndex].name}
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
                  {testimonials[currentTestimonialIndex].name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentTestimonialIndex].title}
                </p>
              </div>
            </div>
            <p className="text-gray-300 italic mb-6">
              &ldquo;{testimonials[currentTestimonialIndex].quote}&rdquo;
            </p>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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

            <div className="flex gap-2">
              {Array.from({ length: testimonials.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentTestimonialIndex
                      ? "bg-white"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
  );
};

export default About;
