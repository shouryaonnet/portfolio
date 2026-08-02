"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";

import {
  CodeXml,
  FolderGit2,
  GraduationCap,
  Route,
  Trophy,
} from "lucide-react";

export default function DeveloperDashboard() {
  const [leetcode, setLeetcode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [heroFinished, setHeroFinished] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  /* ================================
     HERO FINISHED
  ================================ */

  useEffect(() => {
    function handleHeroComplete() {
      setHeroFinished(true);
    }

    window.addEventListener("hero-animation-complete", handleHeroComplete);

    return () => {
      window.removeEventListener("hero-animation-complete", handleHeroComplete);
    };
  }, []);

  /* ================================
     ESCAPE KEY → CLOSE MODAL
  ================================ */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ================================
     FETCH LEETCODE DATA
  ================================ */

  useEffect(() => {
    async function fetchLeetcode() {
      try {
        const res = await fetch("/api/activity");

        if (res.ok) {
          const json = await res.json();
          setLeetcode(json.leetcode);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeetcode();
  }, []);

  /* ================================
     DASHBOARD CARDS
  ================================ */

  const cards = [
    {
      id: "leetcode",
      title: "LeetCode",
      value: loading ? "..." : `${leetcode?.totalSolved}+`,
      subtitle: "Problems Solved",
      icon: CodeXml,
      badgeText: "↗",
      content: <LeetCodeExpanded data={leetcode} loading={loading} />,
    },
    {
      id: "projects",
      title: "Projects",
      value: "3+",
      subtitle: "Featured Works",
      icon: FolderGit2,
      badgeText: "↗",
      content: <ProjectsExpanded onClose={() => setActiveModalIndex(null)} />,
    },
    {
      id: "education",
      title: "Education",
      value: "2027",
      subtitle: "B.Tech CSE Graduation",
      icon: GraduationCap,
      badgeText: "↗",
      content: <EducationExpanded />,
    },
    {
      id: "journey",
      title: "Journey",
      value: "15+",
      subtitle: "Technologies & Goals",
      icon: Route,
      badgeText: "↗",
      content: <JourneyExpanded />,
    },
  ];

  return (
    <section id="stats" className="stats-section mt-10 mb-10">
      {/* ================================
          SECTION HEADING
      ================================= */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        animate={
          heroFinished || shouldReduceMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 12,
              }
        }
        transition={{
          duration: 0.4,
          delay: heroFinished ? 0.05 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center justify-between mb-4"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Developer Dashboard
        </p>
      </motion.div>

      {/* ================================
          DASHBOARD CARDS
      ================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >
        {cards.map((card, i) => {
          const Icon = card.icon;

          // First 2 cards enter from left.
          // Last 2 cards enter from right.
          const fromLeft = i < 2;

          return (
            <motion.div
              key={card.id}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: fromLeft ? -55 : 55,
                      scale: 0.97,
                    }
              }
              animate={
                heroFinished || shouldReduceMotion
                  ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      x: fromLeft ? -55 : 55,
                      scale: 0.97,
                    }
              }
              transition={{
                duration: 0.6,
                delay: heroFinished ? 0.12 + (i % 2) * 0.1 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -5,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.985,
                    }
              }
              onClick={() => setActiveModalIndex(i)}
              className="
                rounded-2xl
                border
                border-slate-200/80
                bg-[#f8fafc]
                p-4.5
                shadow-2xs
                hover:shadow-md
                hover:border-slate-300
                transition-[border-color,box-shadow]
                duration-300
                cursor-pointer
                group
                relative
                overflow-hidden
              "
            >
              {/* TOP */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* ICON */}

                  <div
                    className="
                      w-8
                      h-8
                      rounded-lg
                      bg-white
                      border
                      border-slate-200
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-200
                      group-hover:border-slate-300
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className="
                        text-slate-800
                        transition-transform
                        duration-200
                        group-hover:scale-110
                        group-hover:-rotate-3
                      "
                    />
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      font-bold
                      text-slate-800
                      text-xs
                      tracking-wide
                      uppercase
                      transition-colors
                      duration-200
                      group-hover:text-slate-950
                    "
                  >
                    {card.title}
                  </h3>
                </div>

                {/* ARROW */}

                <span
                  className="
                    w-7
                    h-7
                    rounded-lg
                    bg-[#f1f3f7]
                    group-hover:bg-[#0b0f19]
                    text-slate-600
                    group-hover:text-white
                    font-semibold
                    text-[11px]
                    transition-all
                    duration-200
                    flex
                    items-center
                    justify-center
                    border
                    border-slate-200/60
                    group-hover:border-[#0b0f19]
                    group-hover:-translate-y-[1px]
                    group-hover:translate-x-[1px]
                  "
                >
                  {card.badgeText}
                </span>
              </div>

              {/* VALUE */}

              <div className="mt-3">
                <p
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                    tracking-tight
                    transition-transform
                    duration-200
                    origin-left
                    group-hover:translate-x-[2px]
                  "
                >
                  {card.value}
                </p>

                <p className="text-[11px] text-slate-500 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================================
          MODAL
      ================================= */}

      <AnimatePresence>
        {activeModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.18,
            }}
            onClick={() => setActiveModalIndex(null)}
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              p-4
              sm:p-6
              bg-slate-950/60
              backdrop-blur-md
            "
          >
            {/* MODAL BOX */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      scale: 0.96,
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      scale: 0.97,
                      opacity: 0,
                      y: 10,
                    }
              }
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                bg-white
                border
                border-slate-200/90
                rounded-2xl
                shadow-2xl
                w-full
                max-w-4xl
                max-h-[88vh]
                overflow-y-auto
                hide-scrollbar
                p-6
                sm:p-7
                relative
              "
            >
              {/* MODAL HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-100
                  pb-4
                  mb-5
                "
              >
                <div className="flex items-center gap-3">
                  {/* MODAL ICON */}

                  <div
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-white
                      border
                      border-slate-200
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {(() => {
                      const ModalIcon = cards[activeModalIndex].icon;

                      return (
                        <ModalIcon
                          size={17}
                          strokeWidth={1.8}
                          className="text-slate-900"
                        />
                      );
                    })()}
                  </div>

                  <div>
                    <h3
                      className="
                        font-extrabold
                        text-slate-900
                        text-base
                        sm:text-lg
                      "
                    >
                      {cards[activeModalIndex].title} Details
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      Interactive Overview
                    </p>
                  </div>
                </div>

                {/* CLOSE */}

                <button
                  onClick={() => setActiveModalIndex(null)}
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#f1f3f7]
                    hover:bg-slate-900
                    text-slate-700
                    hover:text-white
                    font-bold
                    text-xs
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    cursor-pointer
                    border
                    border-slate-200/60
                    hover:rotate-90
                  "
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* MODAL CONTENT */}

              <motion.div
                key={cards[activeModalIndex].id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.06,
                  ease: "easeOut",
                }}
              >
                {cards[activeModalIndex].content}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* 1. LeetCode Card Expanded Content */
function LeetCodeExpanded({ data, loading }) {
  const total = data?.totalSolved || 1;
  const easy = data?.easy || 0;
  const medium = data?.medium || 0;
  const hard = data?.hard || 0;

  const CIRCUMFERENCE = 2 * Math.PI * 40;

  const easyArc = (easy / total) * CIRCUMFERENCE;
  const mediumArc = (medium / total) * CIRCUMFERENCE;
  const hardArc = (hard / total) * CIRCUMFERENCE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Donut */}
      <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80">
        <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="transparent"
            />

            {/* Easy */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10b981"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="butt"
              transform="rotate(-90 50 50)"
              initial={{
                strokeDasharray: `0 ${CIRCUMFERENCE}`,
              }}
              animate={{
                strokeDasharray: `${easyArc} ${CIRCUMFERENCE}`,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            />

            {/* Medium */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#f59e0b"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="butt"
              transform={`rotate(${
                (easyArc / CIRCUMFERENCE) * 360 - 90
              } 50 50)`}
              initial={{
                strokeDasharray: `0 ${CIRCUMFERENCE}`,
              }}
              animate={{
                strokeDasharray: `${mediumArc} ${CIRCUMFERENCE}`,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: "easeOut",
              }}
            />

            {/* Hard */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#ef4444"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="butt"
              transform={`rotate(${
                ((easyArc + mediumArc) / CIRCUMFERENCE) * 360 - 90
              } 50 50)`}
              initial={{
                strokeDasharray: `0 ${CIRCUMFERENCE}`,
              }}
              animate={{
                strokeDasharray: `${hardArc} ${CIRCUMFERENCE}`,
              }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: "easeOut",
              }}
            />
          </svg>

          {/* Center */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-900 leading-none">
              {loading ? (
                "..."
              ) : (
                <>
                  <CountUp end={total} duration={1.2} separator="," />+
                </>
              )}
            </span>

            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider mt-1">
              Solved
            </span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />

            <div>
              <p className="text-[10px] text-slate-400 leading-none">Easy</p>

              <p className="text-xs font-bold text-slate-900 mt-1">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={easy} duration={1} delay={0.2} />
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />

            <div>
              <p className="text-[10px] text-slate-400 leading-none">Medium</p>

              <p className="text-xs font-bold text-slate-900 mt-1">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={medium} duration={1} delay={0.35} />
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />

            <div>
              <p className="text-[10px] text-slate-400 leading-none">Hard</p>

              <p className="text-xs font-bold text-slate-900 mt-1">
                {loading ? (
                  "..."
                ) : (
                  <CountUp end={hard} duration={1} delay={0.5} />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Global Rank */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Global Rank
            </span>

            <p className="text-xs font-bold text-slate-900 mt-1">
              {loading ? "..." : data?.rank}
            </p>
          </div>

          {/* Current Streak */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Current Streak
            </span>

            <p className="text-xs font-bold text-emerald-600 mt-1">
              {loading ? "..." : `${data?.currentStreak} Days`}
            </p>
          </div>

          {/* Active Days */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Active Days
            </span>

            <p className="text-xs font-bold text-slate-900 mt-1">
              {loading ? "..." : data?.totalActiveDays}
            </p>
          </div>

          {/* Solving Since */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Solving Since
            </span>

            <p className="text-xs font-bold text-slate-900 mt-1">2026</p>
          </div>

          {/* Primary Language */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Primary Language
            </span>

            <p className="text-xs font-bold text-slate-900 mt-1">Java</p>
          </div>

          {/* Status */}
          <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">
              Status
            </span>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>

              <p className="text-xs font-bold text-emerald-600">
                Actively Solving
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
          <a
            href={`https://leetcode.com/u/${data?.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            @{data?.handle}
          </a>

          <a
            href={`https://leetcode.com/u/${data?.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-[10px] transition-all duration-200"
          >
            View LeetCode ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* 2. Projects Card Expanded Content */
function ProjectsExpanded({ onClose }) {
  const localProjects = [
    {
      name: "DocFind",
      type: "Healthcare Platform",
      label: "Featured",
      footer: "Team Project",
      tech: ["React", "Node.js", "MongoDB", "AI"],
      summary:
        "A healthcare platform for discovering doctors, booking appointments, managing reports, and accessing AI-powered healthcare features.",
    },
    {
      name: "OpenDocs",
      type: "AI Developer Tool",
      label: "AI Powered",
      footer: "AI Integration",
      tech: ["React", "Node.js", "Gemini AI", "Vite"],
      summary:
        "An AI-powered documentation generator that analyzes source code and helps automatically generate structured project documentation.",
    },
    {
      name: "Smart Portfolio",
      type: "Developer Portfolio",
      label: "Personal",
      footer: "Personal Build",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      summary:
        "An interactive developer portfolio built around live coding activity, project showcases, developer stats, and polished dashboard experiences.",
    },
  ];

  const scrollToProjects = () => {
    onClose();

    setTimeout(() => {
      const section = document.getElementById("projects");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Top Projects
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            A quick look at some of my favorite builds.
          </p>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {localProjects.map((p, index) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            whileHover={{ y: -3 }}
            className="group bg-[#f8fafc] hover:bg-white border border-slate-200/80 p-4.5 rounded-2xl transition-colors duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Name + Label */}
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {p.name}
                </h4>

                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
                  {p.label}
                </span>
              </div>

              {/* Project Type */}
              <p className="text-[11px] text-emerald-700 font-bold mb-2.5">
                {p.type}
              </p>

              {/* Small Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                {p.summary}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-semibold border border-slate-200/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Tiny bottom indicator */}
            <div className="pt-3 mt-4 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {p.footer}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore Projects */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
        <p className="text-[10px] text-slate-400">
          Full details, features & demos available below.
        </p>

        <button
          onClick={scrollToProjects}
          className="px-4 py-2 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 group"
        >
          <span>Explore Projects</span>

          <span className="transition-transform duration-200 group-hover:translate-y-0.5">
            ↓
          </span>
        </button>
      </div>
    </div>
  );
}

/* 3. Education Card Expanded Content */
function EducationExpanded() {
  const courses = [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left: Degree Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="lg:col-span-5 flex flex-col justify-between bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80"
      >
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Current Degree
          </span>

          <h4 className="text-base font-extrabold text-slate-900 mt-2 leading-snug">
            B.Tech Computer Science & Engineering
          </h4>

          <p className="text-xs text-slate-600 mt-1.5 font-semibold">
            GLA University
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5">
            Batch of 2023 — 2027
          </p>

          {/* Status */}
          <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[10px] text-slate-600 font-semibold">
              Currently Pursuing
            </span>
          </div>
        </div>

        {/* CGPA */}
        <div className="mt-5 border-t border-slate-200/60 pt-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            Cumulative GPA
          </span>

          <span className="text-sm font-extrabold text-slate-900">
            7.8 / 10.0
          </span>
        </div>
      </motion.div>

      {/* Right */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        {/* Relevant Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.08,
            ease: "easeOut",
          }}
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Relevant Coursework
          </span>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {courses.map((course) => (
              <span
                key={course}
                className="px-2.5 py-1 bg-[#f8fafc] border border-slate-200/80 rounded-lg text-slate-700 text-[11px] font-medium hover:bg-white hover:border-slate-300 transition-colors"
              >
                {course}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Academic Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.16,
            ease: "easeOut",
          }}
          className="pt-4 mt-4 border-t border-slate-100"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Academic Profile
          </span>

          <div className="grid grid-cols-3 gap-3 mt-2.5">
            {/* Core Language */}
            <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                Core Language
              </span>

              <p className="text-sm font-extrabold text-slate-900 mt-1">Java</p>
            </div>

            {/* Degree Status */}
            <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                Degree Status
              </span>

              <p className="text-sm font-extrabold text-emerald-600 mt-1">
                Pursuing
              </p>
            </div>

            {/* Graduation */}
            <div className="p-3 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                Graduation
              </span>

              <p className="text-sm font-extrabold text-slate-900 mt-1">2027</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
/* 4. Journey Card Expanded Content */
/* 4. Journey Card Expanded Content */
/* 4. Journey Card Expanded Content */
/* 4. Journey Card Expanded Content */
function JourneyExpanded() {
  const shouldReduceMotion = useReducedMotion();

  const milestones = [
    {
      year: "2024",
      title: "Hackathon Runner-Up",
      description:
        "Secured 2nd place in two college hackathons, gaining experience in team-based development and competitive building.",
      tag: "2× Runner-Up",
      type: "achievement",
    },
    {
      year: "2025",
      title: "Started DSA",
      description:
        "Began focusing seriously on Data Structures & Algorithms and problem solving using Java.",
      tag: "DSA • Java",
      type: "normal",
    },
    {
      year: "2025",
      title: "Built DocFind",
      description:
        "Built a healthcare platform with doctor discovery, appointment booking, and digital healthcare features.",
      tag: "Healthcare Platform",
      type: "project",
    },
    {
      year: "2026",
      title: "500+ Problems Solved",
      description:
        "Crossed 500 solved problems through consistent DSA and LeetCode practice.",
      tag: "LeetCode • DSA",
      type: "normal",
    },
    {
      year: "2026",
      title: "Built OpenDocs",
      description:
        "Built an AI-powered developer tool for generating structured documentation from source code.",
      tag: "AI Developer Tool",
      type: "project",
    },
    {
      year: "2026",
      title: "Built Smart Portfolio",
      description:
        "Designed and developed this interactive portfolio using Next.js and modern frontend technologies.",
      tag: "Next.js • Framer Motion",
      type: "project",
    },
    {
      year: "Now",
      title: "Spring Boot & Web Backend",
      description:
        "Currently learning Spring Boot and strengthening my Java web backend development skills.",
      tag: "Current Focus",
      type: "current",
    },
  ];

  const lineDuration = 1.5;
  const firstMilestoneDelay = 0.18;
  const milestoneGap = 0.18;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 8,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center justify-between mb-5"
      >
        <div>
          <p className="text-[10px] text-slate-400 font-bold tracking-wider">
            My Timeline
          </p>

          <p className="text-[11px] text-slate-500 mt-0.5">
            From my first achievements to what I'm building toward now.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[10px] font-semibold text-slate-500">
            Currently Building
          </span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute left-[6px] top-2 bottom-3 w-px bg-slate-100" />

        {/* Animated Growing Line */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  scaleY: 0,
                }
          }
          animate={{
            scaleY: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : lineDuration,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: "top",
          }}
          className="absolute left-[6px] top-2 bottom-3 w-px bg-slate-300"
        />

        <div className="flex flex-col">
          {milestones.map((item, index) => {
            const isAchievement = item.type === "achievement";
            const isCurrent = item.type === "current";

            const delay = firstMilestoneDelay + index * milestoneGap;

            return (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-7 pb-4"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: shouldReduceMotion ? 0 : delay,
                    type: shouldReduceMotion ? undefined : "spring",
                    stiffness: 350,
                    damping: 20,
                  }}
                  className={`absolute left-[1px] top-[5px] w-[11px] h-[11px] rounded-full border-2 border-white ring-1 z-10 ${
                    isCurrent
                      ? "bg-emerald-500 ring-emerald-200"
                      : isAchievement
                        ? "bg-amber-400 ring-amber-200"
                        : "bg-slate-400 ring-slate-200"
                  }`}
                />

                {/* Current Pulse */}
                {isCurrent && (
                  <motion.span
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.5,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : delay + 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute left-[2px] top-[6px] flex h-[9px] w-[9px] z-10"
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                  </motion.span>
                )}

                {/* Content */}
                <div className="flex items-start gap-4">
                  {/* Year */}
                  <motion.span
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 4,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: shouldReduceMotion ? 0 : delay + 0.03,
                    }}
                    className={`w-12 flex-shrink-0 text-[10px] font-bold mt-[1px] ${
                      isCurrent
                        ? "text-emerald-600"
                        : isAchievement
                          ? "text-amber-600"
                          : "text-slate-400"
                    }`}
                  >
                    {item.year}
                  </motion.span>

                  {/* Details */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 8,
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : delay + 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-xs font-extrabold text-slate-900">
                        {item.title}
                      </h4>

                      {isAchievement && (
                        <motion.span
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  scale: 0.9,
                                }
                          }
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: shouldReduceMotion ? 0 : delay + 0.12,
                          }}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[8px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          <Trophy
                            size={10}
                            strokeWidth={1.8}
                            className="text-slate-700"
                          />
                          2× Runner-Up
                        </motion.span>
                      )}

                      {isCurrent && (
                        <motion.span
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  scale: 0.9,
                                }
                          }
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: shouldReduceMotion ? 0 : delay + 0.12,
                          }}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[8px] font-bold text-emerald-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          Current
                        </motion.span>
                      )}
                    </div>

                    <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1 max-w-3xl">
                      {item.description}
                    </p>

                    <motion.span
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 3,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: shouldReduceMotion ? 0 : delay + 0.13,
                      }}
                      className={`inline-block mt-1.5 text-[9px] font-semibold ${
                        isCurrent
                          ? "text-emerald-600"
                          : isAchievement
                            ? "text-amber-600"
                            : "text-slate-400"
                      }`}
                    >
                      {item.tag}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
