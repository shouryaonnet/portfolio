"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { SiLeetcode } from "react-icons/si";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const formContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.07,
    },
  },
};

const formItem = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const linksContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.065,
    },
  },
};

const linkItem = {
  hidden: {
    opacity: 0,
    x: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   CONTACT
========================================================= */

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const primaryEmail = "shouryagupta.work@gmail.com";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    setError("");
    setSubmitted(false);

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

      setError("Couldn't send the message. Please email me directly.");
    } finally {
      setSending(false);
    }
  }

  /* =========================================================
     COPY EMAIL
  ========================================================= */

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(primaryEmail);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  }

  /* =========================================================
     SOCIAL LINKS
  ========================================================= */

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
      href: "https://www.linkedin.com/in/shourya-gupta-2353843a6/",
      icon: FaLinkedinIn,
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden mb-20"
    >
      {/* =====================================================
          SECTION HEADER
      ====================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 14,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="flex items-end justify-between gap-6 mb-6"
      >
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
      </motion.div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-px bg-slate-200/80 mb-6 origin-left"
      />

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ===================================================
            LEFT — MESSAGE FORM
        ==================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: -38,
                  y: 8,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-[border-color,box-shadow] duration-300"
        >
          <motion.div
            variants={formContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
          >
            {/* Form Header */}
            <motion.div
              variants={formItem}
              className="flex items-center gap-3 mb-6"
            >
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
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {/* Name + Email */}
              <motion.div
                variants={formItem}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              >
                {/* NAME */}
                <motion.div
                  whileFocusWithin={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -1,
                        }
                  }
                  transition={{
                    duration: 0.18,
                  }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="contact-name"
                    className="text-[10.5px] font-semibold text-slate-500"
                  >
                    Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={sending}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-[#f8fafc] text-[12.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:shadow-sm transition-all duration-200 disabled:opacity-60"
                  />
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  whileFocusWithin={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -1,
                        }
                  }
                  transition={{
                    duration: 0.18,
                  }}
                  className="flex flex-col gap-1.5"
                >
                  <label
                    htmlFor="contact-email"
                    className="text-[10.5px] font-semibold text-slate-500"
                  >
                    Email
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={sending}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-[#f8fafc] text-[12.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:shadow-sm transition-all duration-200 disabled:opacity-60"
                  />
                </motion.div>
              </motion.div>

              {/* =================================================
                  MESSAGE
              ================================================== */}

              <motion.div
                variants={formItem}
                whileFocusWithin={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -1,
                      }
                }
                transition={{
                  duration: 0.18,
                }}
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="contact-message"
                    className="text-[10.5px] font-semibold text-slate-500"
                  >
                    Message
                  </label>

                  {/* Character Counter */}
                  <span className="text-[9.5px] font-mono text-slate-400">
                    {formData.message.length} / 1000
                  </span>
                </div>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me what's on your mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  disabled={sending}
                  className="w-full min-h-[135px] resize-none px-3.5 py-3 rounded-lg border border-slate-200 bg-[#f8fafc] text-[12.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-200 focus:shadow-sm transition-all duration-200 disabled:opacity-60"
                />
              </motion.div>

              {/* =================================================
                  FORM BOTTOM
              ================================================== */}

              <motion.div
                variants={formItem}
                className="flex items-center justify-between gap-4 pt-2"
              >
                <p className="hidden sm:block text-[10.5px] text-slate-400">
                  Your information is only used to reply.
                </p>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={
                    shouldReduceMotion || sending
                      ? undefined
                      : {
                          y: -1,
                        }
                  }
                  whileTap={
                    shouldReduceMotion || sending
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#0b0f19] hover:bg-slate-800 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-[11.5px] font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer group min-w-[125px]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {sending ? (
                      <motion.span
                        key="sending"
                        initial={{
                          opacity: 0,
                          y: 3,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -3,
                        }}
                        className="flex items-center gap-2"
                      >
                        <span>Sending...</span>

                        <LoaderCircle
                          size={13}
                          strokeWidth={1.8}
                          className="animate-spin"
                        />
                      </motion.span>
                    ) : submitted ? (
                      <motion.span
                        key="sent"
                        initial={{
                          opacity: 0,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="flex items-center gap-2"
                      >
                        <span>Message Sent</span>

                        <Check size={13} strokeWidth={2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="flex items-center gap-2"
                      >
                        <span>Send Message</span>

                        <Send
                          size={13}
                          strokeWidth={1.8}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* =================================================
                  SUCCESS / ERROR
              ================================================== */}

              <AnimatePresence mode="wait">
                {submitted && (
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#f8fafc] border border-slate-200">
                      <Check
                        size={13}
                        strokeWidth={2}
                        className="text-slate-700 flex-shrink-0"
                      />

                      <span className="text-[11px] font-medium text-slate-600">
                        Message received. I'll get back to you soon.
                      </span>
                    </div>
                  </motion.div>
                )}

                {error && !submitted && (
                  <motion.div
                    key="error"
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#f8fafc] border border-slate-200">
                      <AlertCircle
                        size={13}
                        strokeWidth={1.8}
                        className="text-slate-600 flex-shrink-0"
                      />

                      <span className="text-[11px] font-medium text-slate-600">
                        {error}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>

        {/* ===================================================
            RIGHT — DIRECT LINKS
        ==================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: 38,
                  y: 8,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-[border-color,box-shadow] duration-300 flex flex-col"
        >
          <motion.div
            variants={linksContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <motion.div
              variants={linkItem}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-9 h-9 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center">
                <Mail size={17} strokeWidth={1.8} className="text-slate-800" />
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-slate-900">
                  Direct links
                </h3>

                <p className="text-[11px] text-slate-500 mt-0.5">
                  Find me across the web.
                </p>
              </div>
            </motion.div>

            {/* =================================================
                EMAIL
            ================================================== */}

            <motion.div variants={linkItem} className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Email
              </p>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200/80 hover:border-slate-300 transition-colors duration-200">
                <a
                  href={`mailto:${primaryEmail}`}
                  className="text-[12px] font-medium text-slate-700 hover:text-slate-950 transition-colors truncate"
                >
                  {primaryEmail}
                </a>

                {/* COPY */}
                <motion.button
                  onClick={handleCopyEmail}
                  type="button"
                  title={copied ? "Copied" : "Copy email"}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.05,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.92,
                        }
                  }
                  className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer flex-shrink-0"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                          rotate: -15,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.5,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                      >
                        <Check size={13} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        transition={{
                          duration: 0.15,
                        }}
                      >
                        <Copy size={13} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* =================================================
                SOCIAL PROFILES
            ================================================== */}

            <motion.div variants={linkItem}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Profiles
              </p>

              <div className="flex flex-col">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.a
                      variants={linkItem}
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: 3,
                            }
                      }
                      transition={{
                        duration: 0.18,
                      }}
                      className={`group flex items-center justify-between gap-4 py-3 ${
                        index !== socialLinks.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center group-hover:bg-white group-hover:border-slate-300 transition-all duration-200 flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-slate-800" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-slate-800 group-hover:text-slate-950 transition-colors">
                            {link.name}
                          </p>

                          <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">
                            {link.username}
                          </p>
                        </div>
                      </div>

                      <ExternalLink
                        size={13}
                        strokeWidth={1.8}
                        className="text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={linkItem}
              className="border-t border-slate-100 pt-4 mt-auto"
            >
              <p className="text-[10.5px] text-slate-400 leading-relaxed">
                Prefer email? Send one directly and I'll reply when available.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
