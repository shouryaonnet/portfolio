"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { SiLeetcode } from "react-icons/si";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const primaryEmail = "shouryagupta.work@gmail.com";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  } catch (error) {
    console.error("Contact form error:", error);
  }
}

  async function handleCopyEmail() {
    await navigator.clipboard.writeText(primaryEmail);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const socialLinks = [
    {
      name: "GitHub",
      username: "@shouryaonnet",
      href: "https://github.com/shouryaonnet",
      icon: FaGithub,
    },
    {
      name: "LeetCode",
      username: "@Shoouryya1",
      href: "https://leetcode.com/u/Shoouryya1/",
      icon: SiLeetcode,
    },
    {
      name: "LinkedIn",
      username: "Shourya",
      href: "https://linkedin.com/in/shourya",
      icon: FaLinkedinIn,
    },
  ];

  return (
    <section
      id="contact"
      className="
        py-16
        px-4
        sm:px-6
        lg:px-8
        max-w-7xl
        mx-auto
      "
    >
      {/* Section Header */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] mb-1.5">
            Contact
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Let's connect
          </h2>

          <p className="text-[13px] text-slate-500 mt-1.5">
            Have a question, opportunity, or something worth building?
          </p>
        </div>

        {/* Status */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[11px] text-slate-500 font-medium">
            Open to conversations
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200/80 mb-6" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ========================= */}
        {/* LEFT — MESSAGE FORM */}
        {/* ========================= */}

        <div
          className="
            lg:col-span-7
            bg-white
            border border-slate-200/90
            rounded-2xl
            p-6
            sm:p-7
            shadow-2xs
          "
        >
          {/* Form Header */}
          <div className="flex items-center gap-3 mb-6">

            <div className="w-9 h-9 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center">
              <MessageSquare
                size={17}
                strokeWidth={1.8}
                className="text-slate-800"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Send a message
              </h3>

              <p className="text-[11px] text-slate-500 mt-0.5">
                I'll get back to you as soon as I can.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3.5"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold text-slate-500">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    rounded-lg
                    border border-slate-200
                    bg-[#f8fafc]
                    text-[12.5px]
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    focus:bg-white
                    focus:border-slate-400
                    focus:ring-1
                    focus:ring-slate-200
                    transition-all
                  "
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold text-slate-500">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-3.5
                    py-2.5
                    rounded-lg
                    border border-slate-200
                    bg-[#f8fafc]
                    text-[12.5px]
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    focus:bg-white
                    focus:border-slate-400
                    focus:ring-1
                    focus:ring-slate-200
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-semibold text-slate-500">
                Message
              </label>

              <textarea
                name="message"
                placeholder="Tell me what's on your mind..."
                value={formData.message}
                onChange={handleChange}
                required
                className="
                  w-full
                  min-h-[135px]
                  resize-none
                  px-3.5
                  py-3
                  rounded-lg
                  border border-slate-200
                  bg-[#f8fafc]
                  text-[12.5px]
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  focus:bg-white
                  focus:border-slate-400
                  focus:ring-1
                  focus:ring-slate-200
                  transition-all
                "
              />
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between gap-4 pt-2">

              <p className="hidden sm:block text-[10.5px] text-slate-400">
                Your information is only used to reply.
              </p>

              <button
                type="submit"
                className="
                  px-4
                  py-2.5
                  rounded-lg
                  bg-[#0b0f19]
                  hover:bg-slate-800
                  text-white
                  text-[11.5px]
                  font-semibold
                  transition-all
                  duration-200
                  flex
                  items-center
                  gap-2
                  cursor-pointer
                  group
                "
              >
                <span>Send Message</span>

                <Send
                  size={13}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>

            {/* Success */}
            {submitted && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#f8fafc] border border-slate-200">
                <Check
                  size={13}
                  strokeWidth={2}
                  className="text-slate-700"
                />

                <span className="text-[11px] font-medium text-slate-600">
                  Message received. I'll get back to you soon.
                </span>
              </div>
            )}
          </form>
        </div>

        {/* ========================= */}
        {/* RIGHT — DIRECT LINKS */}
        {/* ========================= */}

        <div
          className="
            lg:col-span-5
            bg-white
            border border-slate-200/90
            rounded-2xl
            p-6
            sm:p-7
            shadow-2xs
            flex
            flex-col
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">

            <div className="w-9 h-9 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center">
              <Mail
                size={17}
                strokeWidth={1.8}
                className="text-slate-800"
              />
            </div>

            <div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Direct links
              </h3>

              <p className="text-[11px] text-slate-500 mt-0.5">
                Find me across the web.
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email
            </p>

            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200/80">

              <a
                href={`mailto:${primaryEmail}`}
                className="text-[12px] font-medium text-slate-700 hover:text-slate-950 transition-colors truncate"
              >
                {primaryEmail}
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                title="Copy email"
                className="
                  w-7
                  h-7
                  rounded-md
                  bg-white
                  border border-slate-200
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  hover:text-slate-900
                  hover:border-slate-300
                  transition-all
                  cursor-pointer
                  flex-shrink-0
                "
              >
                {copied ? (
                  <Check size={13} />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Profiles
            </p>

            <div className="flex flex-col">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      py-3
                      ${
                        index !== socialLinks.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-slate-800" />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold text-slate-800">
                          {link.name}
                        </p>

                        <p className="text-[10.5px] text-slate-400 mt-0.5">
                          {link.username}
                        </p>
                      </div>
                    </div>

                    <ExternalLink
                      size={13}
                      strokeWidth={1.8}
                      className="
                        text-slate-300
                        group-hover:text-slate-700
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        transition-all
                      "
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              Prefer email? Send one directly and I'll reply when available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}