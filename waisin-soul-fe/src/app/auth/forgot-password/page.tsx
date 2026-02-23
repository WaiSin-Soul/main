"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Password reset email sent! Check your inbox for further instructions.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to send reset email",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <Image
              className="mx-auto w-3/4 h-auto object-cover"
              src="/images/waisin_soul_logo.png"
              alt="logo"
              width={300}
              height={100}
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-900 border border-green-700 text-green-100"
                  : "bg-red-900 border border-red-700 text-red-100"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Remember your password? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
