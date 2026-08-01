"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const techStack = [
  { icon: "☕", name: "Java" },
  { icon: "⚛️", name: "React" },
  { icon: "▲", name: "Next.js" },
  { icon: "🌐", name: "Node.js" },
  { icon: "🚀", name: "Express.js" },
  { icon: "🗄️", name: "MySQL" },
  { icon: "🍃", name: "MongoDB" },
  { icon: "🔧", name: "Git" },
  { icon: "⚡", name: "LeetCode" },
  { icon: "🧩", name: "DSA" },
];

const phrases = [
  "Data Structures & Algorithms Enthusiast",
  "500+ LeetCode Problems Solved",
  "Exploring Java Backend Development",
  "Always Learning. Always Building.",
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
        {/* Left Column: Hero Intro & Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b0f19] text-white text-xs font-semibold mb-8 shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Roles & Opportunities</span>
          </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4">
  Hi, I'm{" "}

  <span className="relative inline-block">
    <span className="relative z-10">Shourya</span>

    {/* Left line */}
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="
        absolute
        left-[6%]
        w-[63%]
        h-[4px]
        bg-slate-900
        rounded-full
        origin-left
      "
      style={{
        bottom: "-4px",
      }}
    />

    {/* Right line */}
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="
        absolute
        right-[-6%]
        w-[20%]
        h-[4px]
        bg-slate-900
        rounded-full
        origin-left
      "
      style={{
        bottom: "-4px",
      }}
    />
  </span>
</h1>
          {/* Sub-headline with Typewriter effect */}
          <div className="h-10 flex items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center">
              <span>{displayedText}</span>
              <span className="text-slate-400 font-normal ml-0.5 animate-pulse">
                |
              </span>
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2">
            <a
              href="#projects"
              className="px-5 py-3 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>View Projects</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Download Resume</span>
              <span className="text-slate-600">⬇</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#f1f3f7] hover:bg-slate-200/80 text-slate-800 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>View Resume</span>
              <span className="text-slate-600">👁</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Stacked Cards (About Me + Tech Stack) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-5 w-full"
        >
          {/* Card 1: ABOUT ME */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span>💡</span>
                <span>ABOUT ME</span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-slate-200/60 border border-slate-300/40 text-slate-600 text-xs font-semibold font-mono">
                B.Tech CSE '27
              </span>
            </div>
            <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed font-normal">
              I believe the best way to learn is by building. I'm a Computer Science student who enjoys building meaningful software and solving challenging problems. With 500+ LeetCode problems solved and multiple full-fledged web projects, I focus on writing clean code, creating polished user experiences, and continuously growing toward becoming a skilled Java developer.
            </p>
          </div>

          {/* Card 2: TECH STACK & TOOLS */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span>⚒️</span>
                <span>TECH STACK & TOOLS</span>
              </div>
              <span className="text-slate-400 text-xs font-medium">
                15+ Technologies
              </span>
            </div>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {techStack.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:border-slate-300 hover:shadow-xs transition-all cursor-default"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}