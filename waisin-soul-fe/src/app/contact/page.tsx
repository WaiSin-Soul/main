"use client";
import React, { useState } from "react";

type ContactType = "art" | "coaching";

const Contact = () => {
  const [contactType, setContactType] = useState<ContactType>("art");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [startedAt] = useState<number>(() => Date.now());

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          contactType,
          startedAt,
        }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to send message");
      }

      setSubmitSuccess("Your message was sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send message right now",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
        Contact Me
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content - Contact Form */}
        <div className="md:col-span-2 bg-[#1a1a1a] rounded-lg shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={100}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  maxLength={200}
                  className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-white mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                minLength={3}
                maxLength={200}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Send to
                </label>
                <div className="inline-flex rounded-md border border-gray-700 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setContactType("art")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      contactType === "art"
                        ? "bg-blue-600 text-white"
                        : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333333]"
                    }`}
                  >
                    Art Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType("coaching")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      contactType === "coaching"
                        ? "bg-blue-600 text-white"
                        : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333333]"
                    }`}
                  >
                    Coaching Email
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                minLength={10}
                maxLength={5000}
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              ></textarea>
            </div>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            {submitError && (
              <p className="text-red-400 text-sm" role="alert">
                {submitError}
              </p>
            )}
            {submitSuccess && (
              <p className="text-green-400 text-sm" role="status">
                {submitSuccess}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Aside - Contact Information */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Contact Information
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <p className="text-gray-300 flex flex-col space-y-1">
                <a
                  href="mailto:waisinsoulart@gmail.com"
                  className="hover:text-blue-400"
                >
                  Art: waisinsoulart@gmail.com
                </a>
                <a
                  href="mailto:waisin.lovelifechanger@gmail.com"
                  className="hover:text-blue-400"
                >
                  Coaching: waisin.lovelifechanger@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Social Media
              </h3>
              <div className="space-y-1">
                <a
                  href="https://www.facebook.com/waisinsoulart"
                  className="flex items-center gap-2"
                >
                  Facebook - Art
                </a>
                <a
                  href="https://www.facebook.com/waisinlovelifechanger"
                  className="flex items-center gap-2"
                >
                  Facebook - Coaching
                </a>
                <a
                  href="https://www.instagram.com/waisinsoul"
                  className="flex items-center gap-2"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
