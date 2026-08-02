"use client";
import Reveal from "@/components/animations/Reveal";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Activity() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveActivity() {
      try {
        const res = await fetch("/api/activity");

        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching live activity:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveActivity();
  }, []);

  const leetcode = data?.leetcode || {
    handle: "Shoouryya1",
    rank: "#12,450",
    totalSolved: 502,
    easy: 199,
    medium: 271,
    hard: 32,
    currentStreak: 67,
    past6Months: [],
  };

  const github = data?.github || {
    handle: "shouryaonnet",
    totalIn150: 64,
    currentStreak: 14,
    past150Days: [],
  };

  return (
    <section
      id="activity"
      className="activity-section mt-20 mb-20 px-4 sm:px-6 lg:px-8 mx-auto select-none"
    >
      {/* Section Header */}
      <Reveal>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Activity & Live Streaks
          </p>

          <span className="hidden sm:block text-xs font-mono font-medium text-slate-400">
            Real-Time Activity Telemetry
          </span>
        </div>
      </Reveal>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full">
        {/* =====================================================
            GITHUB CARD
        ====================================================== */}

        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between min-w-0">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5 min-w-0">
                <FaGithub className="text-[22px] text-slate-950 flex-shrink-0" />

                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex-shrink-0">
                    GitHub
                  </h3>

                  <a
                    href={`https://github.com/${github.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors truncate"
                  >
                    @{github.handle} ↗
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Activity Heading */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Coding Activity
                </p>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Recent GitHub contributions
                </p>
              </div>

              <span className="text-[10px] font-mono font-medium text-slate-400 flex-shrink-0">
                Past 5 Months
              </span>
            </div>

            {/* Heatmap */}
            <GitHubHeatmap days={github.past150Days} loading={loading} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-3.5 border-t border-slate-200/60">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />

              <span className="truncate">Synced from GitHub</span>
            </span>

            <a
              href={`https://github.com/${github.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-[10px] transition-all duration-200 flex items-center gap-1.5 group flex-shrink-0"
            >
              <span>View GitHub</span>

              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* =====================================================
            LEETCODE CARD
        ====================================================== */}

        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between min-w-0">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5 min-w-0">
                <SiLeetcode className="text-[21px] text-slate-950 flex-shrink-0" />

                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex-shrink-0">
                    LeetCode
                  </h3>

                  <a
                    href={`https://leetcode.com/u/${leetcode.handle}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors truncate"
                  >
                    @{leetcode.handle} ↗
                  </a>
                </div>
              </div>

              {/* Live */}
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Activity Heading */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  Problem Solving Activity
                </p>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Recent LeetCode submissions
                </p>
              </div>

              <span className="text-[9px] font-mono font-medium text-slate-400 flex-shrink-0">
                Past 6 Months
              </span>
            </div>

            {/* Heatmap */}
            <LeetCodeHeatmap days={leetcode.past6Months} loading={loading} />

            {/* Current Streak */}
            <div className="flex items-center justify-between py-3 mt-3 border-y border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                  Current Streak
                </span>
              </div>

              <span className="text-xs font-extrabold text-emerald-600">
                {loading ? "..." : `${leetcode.currentStreak} Days`}
              </span>
            </div>

            {/* Difficulty Breakdown */}
            <div className="mt-3">
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-2.5">
                Solved by Difficulty
              </p>

              <div className="grid grid-cols-3 divide-x divide-slate-200">
                {/* Easy */}
                <div className="pr-3 sm:pr-4">
                  <p className="text-[9px] text-slate-400 font-medium">Easy</p>

                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {loading ? "..." : leetcode.easy}
                  </p>
                </div>

                {/* Medium */}
                <div className="px-3 sm:px-4">
                  <p className="text-[9px] text-slate-400 font-medium">
                    Medium
                  </p>

                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {loading ? "..." : leetcode.medium}
                  </p>
                </div>

                {/* Hard */}
                <div className="pl-3 sm:pl-4">
                  <p className="text-[9px] text-slate-400 font-medium">Hard</p>

                  <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {loading ? "..." : leetcode.hard}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 mt-5 pt-3.5 border-t border-slate-200/60">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />

              <span className="truncate">Synced from LeetCode</span>
            </span>

            <a
              href={`https://leetcode.com/u/${leetcode.handle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-[10px] transition-all duration-200 flex items-center gap-1.5 group flex-shrink-0"
            >
              <span>View LeetCode</span>

              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SHARED ACTIVITY HEATMAP
========================================================= */

function ActivityHeatmap({ days = [], loading = false, type = "github" }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCell, setActiveCell] = useState(null);

  const isGithub = type === "github";

  const maxDays = isGithub ? 147 : 182;

  const cells = Array.isArray(days) ? days.slice(-maxDays) : [];

  const columns = Math.ceil(cells.length / 7);

  /* =====================================================
     DATE HELPERS
  ====================================================== */

  const formatMonth = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
    });
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =====================================================
     MONTH LABELS
  ====================================================== */

  const monthLabels = [];

  cells.forEach((day, index) => {
    if (!day?.date) return;

    const month = formatMonth(day.date);

    if (index === 0 || month !== formatMonth(cells[index - 1]?.date)) {
      monthLabels.push({
        month,
        index,
      });
    }
  });

  /* =====================================================
     COLORS
  ====================================================== */

  function getColor(count) {
    if (isGithub) {
      if (count > 6) return "bg-[#216e39]";
      if (count > 3) return "bg-[#30a14e]";
      if (count > 1) return "bg-[#40c463]";
      if (count > 0) return "bg-[#9be9a8]";

      return "bg-slate-200/60";
    }

    if (count >= 9) return "bg-emerald-800";
    if (count >= 5) return "bg-emerald-600";
    if (count >= 2) return "bg-emerald-400";
    if (count >= 1) return "bg-emerald-200";

    return "bg-slate-200/60";
  }

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    const loadingColumns = isGithub ? 21 : 26;
    const loadingCells = isGithub ? 147 : 182;

    return (
      <div className="w-full min-w-0 overflow-hidden">
        <div
          className="grid gap-[3px] sm:gap-1"
          style={{
            gridTemplateColumns: `repeat(${loadingColumns}, minmax(0, 1fr))`,
            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            gridAutoFlow: "column",
          }}
        >
          {Array.from({ length: loadingCells }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square w-full max-w-[7px] min-[400px]:max-w-[8px] sm:max-w-3 rounded-[2px] bg-slate-200/70 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* =====================================================
     EMPTY
  ====================================================== */

  if (!cells.length) {
    return (
      <div className="h-[100px] flex items-center justify-center rounded-xl border border-dashed border-slate-200">
        <span className="text-[10px] text-slate-400 font-medium">
          {isGithub
            ? "GitHub activity unavailable"
            : "LeetCode activity unavailable"}
        </span>
      </div>
    );
  }

  /* =====================================================
     HEATMAP
  ====================================================== */

  return (
    <div
      className="relative w-full min-w-0 min-h-[115px]"
      onMouseLeave={() => setActiveCell(null)}
    >
      {/* Heatmap Grid */}
      <div
        className="grid gap-[3px] sm:gap-1 w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: "repeat(7, minmax(0, 1fr))",
          gridAutoFlow: "column",
        }}
      >
        {cells.map((day, idx) => {
          const count = day?.count || 0;

          /*
            0 - 6   = column 0
            7 - 13  = column 1
            14 - 20 = column 2

            This creates the left -> right
            heatmap fill animation.
          */

          const columnIndex = Math.floor(idx / 7);

          const delay = columnIndex * (isGithub ? 0.035 : 0.025);

          return (
            <motion.button
              type="button"
              key={`${day?.date || "day"}-${idx}`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.65,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0,
                margin: "100px 0px 100px 0px",
              }}
              transition={{
                duration: 0.26,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.3,
                      zIndex: 10,
                    }
              }
              whileTap={{
                scale: 1.12,
              }}
              onMouseEnter={() =>
                setActiveCell({
                  index: idx,
                  day,
                })
              }
              onFocus={() =>
                setActiveCell({
                  index: idx,
                  day,
                })
              }
              onBlur={() => setActiveCell(null)}
              onClick={() =>
                setActiveCell({
                  index: idx,
                  day,
                })
              }
              aria-label={`${formatDate(day?.date)}: ${count} ${
                isGithub
                  ? count === 1
                    ? "contribution"
                    : "contributions"
                  : count === 1
                    ? "submission"
                    : "submissions"
              }`}
              className={`
                ${getColor(count)}
                aspect-square
                w-full
                max-w-[7px]
                min-[400px]:max-w-[8px]
                sm:max-w-3
                rounded-[2px]
                cursor-pointer
                relative
                outline-none
                focus:ring-1
                focus:ring-slate-500
                focus:ring-offset-1
              `}
            />
          );
        })}
      </div>

      {/* =================================================
          TOOLTIP
      ================================================== */}

      <div className="h-8 mt-2 flex items-center justify-center overflow-visible">
        <motion.div
          initial={false}
          animate={{
            opacity: activeCell ? 1 : 0,
            y: activeCell ? 0 : 3,
            scale: activeCell ? 1 : 0.98,
          }}
          transition={{
            duration: 0.14,
            ease: "easeOut",
          }}
          className="
            px-2.5
            py-1
            rounded-md
            bg-slate-900
            text-white
            text-[9px]
            sm:text-[10px]
            font-mono
            whitespace-nowrap
            shadow-md
            pointer-events-none
          "
        >
          {activeCell ? (
            <>
              {formatDate(activeCell.day?.date)}
              <span className="text-slate-500 mx-1.5">·</span>
              {activeCell.day?.count || 0}{" "}
              {isGithub
                ? (activeCell.day?.count || 0) === 1
                  ? "contribution"
                  : "contributions"
                : (activeCell.day?.count || 0) === 1
                  ? "submission"
                  : "submissions"}
            </>
          ) : (
            <span className="opacity-0">Activity</span>
          )}
        </motion.div>
      </div>

      {/* =================================================
          MONTH LABELS
      ================================================== */}

      <div className="relative h-4 mt-0.5 overflow-hidden">
        {monthLabels.map(({ month, index }) => {
          const columnIndex = Math.floor(index / 7);

          const left = columns > 1 ? (columnIndex / (columns - 1)) * 100 : 0;

          return (
            <span
              key={`${month}-${index}`}
              className="
                  absolute
                  text-[8px]
                  sm:text-[9px]
                  font-mono
                  text-slate-400
                  -translate-x-1/2
                  whitespace-nowrap
                "
              style={{
                left: `${Math.min(Math.max(left, 3), 96)}%`,
              }}
            >
              {month}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   GITHUB HEATMAP
========================================================= */

function GitHubHeatmap({ days = [], loading = false }) {
  return <ActivityHeatmap days={days} loading={loading} type="github" />;
}

/* =========================================================
   LEETCODE HEATMAP
========================================================= */

function LeetCodeHeatmap({ days = [], loading = false }) {
  return <ActivityHeatmap days={days} loading={loading} type="leetcode" />;
}
