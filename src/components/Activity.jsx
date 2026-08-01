"use client";

import { useState, useEffect } from "react";
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
  className="activity-section pt-6 pb-16 px-4 sm:px-6 lg:px-8 mx-auto select-none"
>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Activity & Live Streaks
        </p>
        <span className="text-xs font-mono font-medium text-slate-400">
          Real-Time Activity Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full">
        {/* LEFT SIDE: GitHub Card (5 Months Activity) */}
       {/* LEFT SIDE: GitHub Card */}
{/* LEFT SIDE: GitHub Card */}
<div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-7">
      <div className="flex items-center gap-2.5">
        <FaGithub className="text-[22px] text-slate-950 flex-shrink-0" />

        <div className="flex items-center gap-2">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            GitHub
          </h3>

          <a
            href={`https://github.com/${github.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            @{github.handle} ↗
          </a>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
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
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Coding Activity
        </p>

        <p className="text-[10px] text-slate-400 mt-0.5">
          Recent GitHub contributions
        </p>
      </div>

      <span className="text-[10px] font-mono font-medium text-slate-400">
        Past 5 Months
      </span>
    </div>

    {/* Heatmap */}
    <GitHubHeatmap
      days={github.past150Days}
      loading={loading}
    />
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between mt-6 pt-3.5 border-t border-slate-200/60">
    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Synced from GitHub
    </span>

    <a
  href={`https://github.com/${github.handle}`}
  target="_blank"
  rel="noopener noreferrer"
  className="px-3.5 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-[10px] transition-all duration-200 flex items-center gap-1.5 group"
>
  <span>View GitHub</span>

  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
    ↗
  </span>
</a>
  </div>
</div>

        {/* RIGHT SIDE: LeetCode Card (Rank, Solved breakdown on Left | Streak & Heatmap on Right) */}
      {/* RIGHT SIDE: LeetCode Card */}
<div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2.5">
        <SiLeetcode className="text-[21px] text-slate-950 flex-shrink-0" />

        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
            LeetCode
          </h3>

          <a
            href={`https://leetcode.com/u/${leetcode.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            @{leetcode.handle} ↗
          </a>
        </div>
      </div>

      {/* Live */}
      <div className="flex items-center gap-1.5">
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
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
          Problem Solving Activity
        </p>

        <p className="text-[10px] text-slate-400 mt-0.5">
          Recent LeetCode submissions
        </p>
      </div>

      <span className="text-[9px] font-mono font-medium text-slate-400">
        Past 6 Months
      </span>
    </div>

    {/* Heatmap */}
    <LeetCodeHeatmap
      days={leetcode.past6Months}
      loading={loading}
    />

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
        <div className="pr-4">
          <p className="text-[9px] text-slate-400 font-medium">
            Easy
          </p>

          <p className="text-sm font-extrabold text-slate-900 mt-0.5">
            {loading ? "..." : leetcode.easy}
          </p>
        </div>

        {/* Medium */}
        <div className="px-4">
          <p className="text-[9px] text-slate-400 font-medium">
            Medium
          </p>

          <p className="text-sm font-extrabold text-slate-900 mt-0.5">
            {loading ? "..." : leetcode.medium}
          </p>
        </div>

        {/* Hard */}
        <div className="pl-4">
          <p className="text-[9px] text-slate-400 font-medium">
            Hard
          </p>

          <p className="text-sm font-extrabold text-slate-900 mt-0.5">
            {loading ? "..." : leetcode.hard}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200/60">
    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Synced from LeetCode
    </span>

    <a
      href={`https://leetcode.com/u/${leetcode.handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3.5 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-[10px] transition-all duration-200 flex items-center gap-1.5 group"
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

/* GitHub Heatmap (5 Months Grid: 21 columns x 7 rows) */
function GitHubHeatmap({ days = [], loading = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cells = days.slice(-147);

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

  const monthLabels = [];

  cells.forEach((day, index) => {
    if (!day.date) return;

    const month = formatMonth(day.date);

    if (
      index === 0 ||
      month !== formatMonth(cells[index - 1]?.date)
    ) {
      monthLabels.push({
        month,
        index,
      });
    }
  });

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {Array.from({ length: 147 }).map((_, idx) => (
            <div
              key={idx}
              className="w-3 h-3 rounded-xs bg-slate-200/70 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!cells.length) {
    return (
      <div className="h-[110px] flex items-center justify-center rounded-xl border border-dashed border-slate-200">
        <span className="text-[11px] text-slate-400 font-medium">
          GitHub activity unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Heatmap */}
      <div className="grid grid-flow-col grid-rows-7 gap-1 pb-2">
        {cells.map((day, idx) => {
          const count = day.count || 0;

          let bgClass = "bg-slate-200/60";

          if (count > 6) bgClass = "bg-[#216e39]";
          else if (count > 3) bgClass = "bg-[#30a14e]";
          else if (count > 1) bgClass = "bg-[#40c463]";
          else if (count > 0) bgClass = "bg-[#9be9a8]";

          return (
            <div
              key={`${day.date}-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-3 h-3 rounded-xs ${bgClass} relative cursor-pointer transition-transform duration-150 hover:scale-125`}
            >
              {hoveredIndex === idx && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-950 text-white text-[10px] rounded-lg font-mono whitespace-nowrap z-30 shadow-md pointer-events-none">
                  {formatDate(day.date)} · {count}{" "}
                  {count === 1 ? "contribution" : "contributions"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Labels */}
      <div className="relative h-5 mt-1">
        {monthLabels.map(({ month, index }) => (
          <span
            key={`${month}-${index}`}
            className="absolute text-[10px] font-mono text-slate-400"
            style={{
              left: `${(index / cells.length) * 100}%`,
            }}
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}

/* LeetCode Heatmap (3 Months Grid: 13 columns x 7 rows) */
function LeetCodeHeatmap({ days = [], loading = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cells = days.slice(-182);

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

  const monthLabels = [];

  cells.forEach((day, index) => {
    if (!day.date) return;

    const month = formatMonth(day.date);

    if (
      index === 0 ||
      month !== formatMonth(cells[index - 1]?.date)
    ) {
      monthLabels.push({
        month,
        index,
      });
    }
  });

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {Array.from({ length: 182 }).map((_, idx) => (
            <div
              key={idx}
              className="w-3 h-3 rounded-xs bg-slate-200/70 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!cells.length) {
    return (
      <div className="h-[90px] flex items-center justify-center rounded-xl border border-dashed border-slate-200">
        <span className="text-[10px] text-slate-400 font-medium">
          LeetCode activity unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Heatmap */}
      <div className="grid grid-flow-col grid-rows-7 gap-1 pb-2">
        {cells.map((day, idx) => {
          const count = day.count || 0;

          let bgClass = "bg-slate-200/60";

          if (count >= 9) {
            bgClass = "bg-emerald-800";
          } else if (count >= 5) {
            bgClass = "bg-emerald-600";
          } else if (count >= 2) {
            bgClass = "bg-emerald-400";
          } else if (count >= 1) {
            bgClass = "bg-emerald-200";
          }

          return (
            <div
              key={`${day.date}-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-3 h-3 rounded-xs ${bgClass} relative cursor-pointer transition-transform duration-150 hover:scale-125`}
            >
              {hoveredIndex === idx && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-950 text-white text-[9px] rounded-lg font-mono whitespace-nowrap z-30 shadow-md pointer-events-none">
                  {formatDate(day.date)} · {count}{" "}
                  {count === 1 ? "submission" : "submissions"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Labels */}
      <div className="relative h-4 mt-1">
        {monthLabels.map(({ month, index }) => (
          <span
            key={`${month}-${index}`}
            className="absolute text-[9px] font-mono text-slate-400"
            style={{
              left: `${(index / cells.length) * 100}%`,
            }}
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}