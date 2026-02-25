"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const UnsubscribePage = () => {
  const [email, setEmail] = useState("");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    setIsUnsubscribing(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "You have been successfully unsubscribed from our newsletter.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to unsubscribe. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
      // console.error("Unsubscribe error:", error);
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              className="mx-auto w-3/4 h-auto object-cover"
              src="/images/waisin_soul_logo.png"
              alt="logo"
              width={300}
              height={100}
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#2a2a2a] rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Unsubscribe</h1>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.type === "success"
                  ? "bg-green-900 border border-green-700 text-green-100"
                  : "bg-red-900 border border-red-700 text-red-100"
              }`}
            >
              <p>{message.text}</p>
            </div>
          )}

          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <p className="text-gray-300 mb-6">
              Enter your email to unsubscribe from our newsletter
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#333333] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isUnsubscribing}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
            </button>
          </form>

          <Link
            href="/"
            className="block text-center text-blue-400 hover:text-blue-300 mt-4"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
