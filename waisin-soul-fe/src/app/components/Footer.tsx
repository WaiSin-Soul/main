"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setMessage(data.error || "Failed to subscribe");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 sm:px-6 lg:px-8">
        {/* Info Column */}
        <div className="space-y-2">
          <Link href="/">
            <Image
              className="w-40 sm:w-48 h-auto object-contain"
              src="/images/waisin_soul_logo.png"
              alt="logo"
              width={300}
              height={100}
            />
          </Link>
          <div className="text-sm space-y-2">
            <p>Waisin Tong-Darbonne</p>
            <p>Artist</p>
            <p>© 2025 All Rights Reserved</p>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="text-sm">
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <div className="text-sm space-y-2 flex flex-col">
            <Link href="/about">About the artist</Link>
            <Link href="/coaching">Coaching</Link>
          </div>
        </div>

        {/* Stay Updated Column */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>
          <div className="text-sm space-y-2 flex flex-col">
            <a
              href="https://www.facebook.com/waisinsoulart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/footer/facebook.png"
                alt="Facebook Art"
                width={20}
                height={20}
              />
              Art
            </a>
            <a
              href="https://www.facebook.com/waisinlovelifechanger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/footer/facebook.png"
                alt="Facebook Coaching"
                width={20}
                height={20}
              />
              Coaching
            </a>
            <a
              href="https://www.instagram.com/waisinsoul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/footer/instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />
              Instagram
            </a>
          </div>
        </div>

        {/* Email Sub Column */}
        <div>
          <h3 className="font-semibold mb-4">Subscribe</h3>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full p-2 bg-transparent border border-white rounded mb-2 text-sm disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-2 px-4 rounded text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "SUBSCRIBING..." : "SIGN UP"}
            </button>
          </form>
          {message && (
            <p
              className={`text-xs mt-2 ${message.includes("success") || message.includes("already") ? "text-green-400" : "text-red-400"}`}
            >
              {message}
            </p>
          )}
          {!message && (
            <p className="text-xs mt-2">
              I&apos;d like to receive exclusive discounts and the latest
              information.
            </p>
          )}
        </div>
      </div>

      {/* Payment Icons */}
      {/* <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/images/footer/visa.png"
            alt="Visa"
            width={40}
            height={25}
          />
          <Image
            src="/images/footer/mastercard.png"
            alt="Mastercard"
            width={40}
            height={25}
          />
          <Image
            src="/images/footer/amex.png"
            alt="American Express"
            width={40}
            height={25}
          />
          <Image
            src="/images/footer/paypal.png"
            alt="PayPal"
            width={40}
            height={25}
          />
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
