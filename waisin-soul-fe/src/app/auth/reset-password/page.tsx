"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../../lib/supabase-browser";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      if (!code && !tokenHash) {
        setMessage({
          type: "error",
          text: "Invalid reset link. Please request a new password reset.",
        });
        return;
      }

      // If we have valid token parameters, allow password reset
      setIsValidToken(true);
    };

    verifyToken();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to reset password",
        });
      } else {
        setMessage({
          type: "success",
          text: "Password reset successfully! Redirecting to login...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
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

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
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
            <h2 className="mt-6 text-2xl font-bold text-white">Invalid Link</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg shadow-lg p-8">
            <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded-lg mb-6">
              <p className="text-sm">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>

            <Link
              href="/auth/forgot-password"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="mt-6 text-3xl font-bold text-white">Set New Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your new password below
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

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
