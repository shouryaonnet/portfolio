"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const primaryEmail = "shourya@example.com";

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(primaryEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Clean Minimal Message Form */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-3">
            Send a{" "}
            <span className="border-b-[3px] border-slate-900 pb-0.5 inline-block">
              Message
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mb-6">
            Have an opportunity, project idea, or question? Send a message straight to my email.
          </p>

          <form className="flex flex-col gap-3.5 w-full max-w-lg" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="px-4 py-3 rounded-xl border border-slate-200/90 bg-white text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 font-medium shadow-2xs"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              className="px-4 py-3 rounded-xl border border-slate-200/90 bg-white text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 font-medium shadow-2xs"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              className="px-4 py-3 rounded-xl border border-slate-200/90 bg-white text-slate-900 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 font-medium min-h-[120px] shadow-2xs"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <div className="mt-1">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Send Message</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {submitted && (
              <p className="text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200/80 p-3 rounded-xl mt-2">
                ✓ Message received — I'll get back to you shortly!
              </p>
            )}
          </form>
        </div>

        {/* Right Column: Clean Minimal Social Buttons */}
        <div className="lg:col-span-6 flex flex-col items-start text-left pt-2 lg:pt-0">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b0f19] text-white text-xs font-semibold mb-6 shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Roles & Collaborations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-3">
            Connect{" "}
            <span className="border-b-[3px] border-slate-900 pb-0.5 inline-block">
              Directly
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mb-8">
            Connect with me across social platforms or explore my repositories and problem-solving profiles.
          </p>

          {/* Social Buttons Row (Hero Style) */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            {/* GitHub Button */}
            <a
              href="https://github.com/shouryaonnet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>GitHub</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            {/* LeetCode Button */}
            <a
              href="https://leetcode.com/u/Shoouryya1/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>LeetCode</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com/in/shourya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#f1f3f7] hover:bg-slate-200/80 text-slate-800 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>LinkedIn</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            {/* Email Me Button */}
            <a
              href={`mailto:${primaryEmail}`}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Email Me</span>
              <span className="text-slate-600">✉️</span>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-xl bg-[#f1f3f7] hover:bg-slate-200/80 text-slate-800 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{copied ? "Email Copied! ✓" : "Copy Email"}</span>
              <span className="text-slate-600">📋</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}