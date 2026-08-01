"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Info, Wrench, Braces } from "lucide-react";

import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiLeetcode,
} from "react-icons/si";
import {
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";

const phrases = [
  "Data Structures & Algorithms Enthusiast",
  "500+ LeetCode Problems Solved",
  "Exploring Java Backend Development",
  "Always Learning. Always Building.",
];

const techStack = [
  { name: "Java", icon: FaJava },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express.js", icon: SiExpress },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Git", icon: FaGitAlt },
  { name: "LeetCode", icon: SiLeetcode },
  { name: "DSA", icon: Braces },
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
        setDisplayedText(
          currentPhrase.slice(0, displayedText.length + 1)
        );
      }, 70);
    } else if (
      !isDeleting &&
      displayedText.length === currentPhrase.length
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(
          currentPhrase.slice(0, displayedText.length - 1)
        );
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

        {/* LEFT COLUMN */}
        {/* LEFT COLUMN */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    ease: "easeOut",
  }}
  className="lg:col-span-6 flex flex-col items-start text-left"
>
  {/* Status Badge */}
  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0b0f19] text-white mb-8 shadow-sm">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>

    <span className="text-[12px] font-medium tracking-wide text-slate-100">
      Building · Learning · Solving
    </span>
  </div>

  {/* Name */}
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4">
    Hi, I'm{" "}

    <span className="relative inline-block">
      <span className="relative z-10">
        Shourya
      </span>

      {/* Left underline */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.25,
        }}
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

      {/* Right underline */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.45,
        }}
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

  {/* Typewriter */}
  <div className="h-10 flex items-center mb-6">
    <h2 className="text-lg sm:text-xl font-semibold text-slate-600 tracking-tight flex items-center">
      <span>{displayedText}</span>

      <span className="text-slate-400 font-normal ml-0.5 animate-pulse">
        |
      </span>
    </h2>
  </div>

  {/* Actions */}
  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto mt-2">

    {/* Projects */}
    <a
      href="#projects"
      className="
        px-4 py-2.5
        rounded-lg
        bg-[#0b0f19]
        hover:bg-slate-800
        text-white
        text-[13px]
        font-medium
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        group
      "
    >
      <span>View Projects</span>

      <ArrowRight
        size={15}
        strokeWidth={2}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </a>

    {/* Download Resume */}
    <a
      href="/resume.pdf"
      download
      className="
        px-4 py-2.5
        rounded-lg
        bg-white
        hover:bg-slate-50
        text-slate-700
        text-[13px]
        font-medium
        border
        border-slate-200
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <Download
        size={15}
        strokeWidth={1.8}
      />

      <span>Download Resume</span>
    </a>

    {/* View Resume */}
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="
        px-4 py-2.5
        rounded-lg
        bg-[#f8fafc]
        hover:bg-slate-100
        text-slate-700
        text-[13px]
        font-medium
        border
        border-slate-200/80
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
      "
    >
      <Eye
        size={15}
        strokeWidth={1.8}
      />

      <span>View Resume</span>
    </a>

  </div>
</motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="lg:col-span-6 flex flex-col gap-5 w-full"
        >

          {/* ABOUT ME */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow">

            {/* Header */}
            <div className="flex items-center justify-between mb-3.5">

              <div className="flex items-center gap-2.5">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Info
                    size={17}
                    strokeWidth={2}
                    className="text-slate-900"
                  />
                </div>

                <span className="text-[13px] font-semibold text-slate-800 uppercase tracking-wide">
                  About Me
                </span>
              </div>

              <span className="text-[12.5px] text-slate-500 font-medium">
                B.Tech CSE · 2027
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-[14.5px] text-slate-600 leading-[1.7]">
              I believe the best way to learn is by building. I'm a
              Computer Science student who enjoys building meaningful
              software and solving challenging problems. With 500+
              LeetCode problems solved and multiple full-fledged web
              projects, I focus on clean code, thoughtful user
              experiences, and continuously improving my Java
              development skills.
            </p>
          </div>

          {/* TECH STACK */}
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2.5">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Wrench
                    size={17}
                    strokeWidth={2}
                    className="text-slate-900"
                  />
                </div>

                <span className="text-[13px] font-semibold text-slate-800 uppercase tracking-wide">
                  Tech Stack & Tools
                </span>
              </div>

              <span className="text-[12.5px] text-slate-500 font-medium">
                10+ Technologies
              </span>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white
                      border border-slate-200
                      text-xs
                      font-medium
                      text-slate-700
                      flex items-center
                      gap-2
                      hover:border-slate-300
                      hover:text-slate-900
                      hover:bg-slate-50
                      transition-all
                      cursor-default
                    "
                  >
                    <Icon className="w-4 h-4 text-slate-800 flex-shrink-0" />

                    <span>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}