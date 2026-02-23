"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const UnsubscribeContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUnsubscribe = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Email not provided" });
      return;
    }

    setIsUnsubscribing(true);
    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "You have been unsubscribed from our newsletter.",
        });
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

          {message ? (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.type === "success"
                  ? "bg-green-900 border border-green-700 text-green-100"
                  : "bg-red-900 border border-red-700 text-red-100"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-300 mb-6">
                {email ? (
                  <>
                    We're sorry to see you go. Are you sure you want to unsubscribe{" "}
                    <span className="font-semibold">{email}</span> from our newsletter?
                  </>
                ) : (
                  "Email not found. Please use the unsubscribe link from your email."
                )}
              </p>

              {email && (
                <button
                  onClick={handleUnsubscribe}
                  disabled={isUnsubscribing}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-3"
                >
                  {isUnsubscribing ? "Unsubscribing..." : "Yes, Unsubscribe"}
                </button>
              )}
            </>
          )}

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

const UnsubscribePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
};

export default UnsubscribePage;
