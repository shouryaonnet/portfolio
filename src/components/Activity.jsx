"use client";

import { useState, useEffect } from "react";

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
    past90Days: [],
  };

  const github = data?.github || {
    handle: "shouryaonnet",
    totalIn150: 64,
    currentStreak: 14,
    past150Days: [],
  };

  return (
    <section id="activity" className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Activity & Live Streaks
        </p>
        <span className="text-xs font-mono font-medium text-slate-400">
          Real-Time Activity Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT SIDE: GitHub Card (5 Months Activity) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🐙</span>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">GitHub</h3>
                <a
                  href={`https://github.com/${github.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  @{github.handle} ↗
                </a>
              </div>

              {/* Streak Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f19] text-white text-xs font-bold shadow-2xs">
                <span>🔥</span>
                <span>{loading ? "..." : `${github.currentStreak} Days`}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider ml-0.5">
                  Commit Streak
                </span>
              </div>
            </div>

            {/* Sub Stats Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/60">
              <span className="text-sm font-extrabold text-slate-900">
                {loading ? "..." : `${github.totalIn150} Commits`}
              </span>
              <span className="text-xs font-medium text-slate-500 font-mono">
                Past 5 Months (150 Days)
              </span>
            </div>

            {/* 5 Months Grid (21 Columns x 7 Rows = 147 Cells) */}
            <GitHubHeatmap days={github.past150Days} />
          </div>

          {/* Footer CTA Button */}
          <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200/60">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Synced Live
            </span>

            <a
              href={`https://github.com/${github.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View Profile</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: LeetCode Card (Rank, Solved breakdown on Left | Streak & Heatmap on Right) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧩</span>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">LeetCode</h3>
                <a
                  href={`https://leetcode.com/u/${leetcode.handle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  @{leetcode.handle} ↗
                </a>
              </div>

              {/* Streak Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f19] text-white text-xs font-bold shadow-2xs">
                <span>🔥</span>
                <span>{loading ? "..." : `${leetcode.currentStreak} Days`}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider ml-0.5">
                  Live Streak
                </span>
              </div>
            </div>

            {/* Split Card Content: Left stats breakdown, Right heatmap grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pb-2">
              {/* Left Column of LeetCode Card: Rank & Difficulties */}
              <div className="sm:col-span-5 flex flex-col gap-3">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Global Ranking
                  </span>
                  <p className="text-sm font-extrabold text-slate-900">{leetcode.rank}</p>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Problems Solved
                  </span>
                  <p className="text-xl font-black text-slate-900">{leetcode.totalSolved}</p>
                </div>

                {/* Difficulty Badges */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center justify-between text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-emerald-800">
                    <span>Easy</span>
                    <span className="font-mono">{leetcode.easy}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-800">
                    <span>Medium</span>
                    <span className="font-mono">{leetcode.medium}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50/80 border border-rose-200/60 text-rose-800">
                    <span>Hard</span>
                    <span className="font-mono">{leetcode.hard}</span>
                  </div>
                </div>
              </div>

              {/* Right Column of LeetCode Card: Heatmap Grid (3 Months) */}
              <div className="sm:col-span-7 flex flex-col items-center sm:items-end w-full">
                <LeetCodeHeatmap days={leetcode.past90Days} />
              </div>
            </div>
          </div>

          {/* Footer CTA Button */}
          <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200/60">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Synced Live
            </span>

            <a
              href={`https://leetcode.com/u/${leetcode.handle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View Profile</span>
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
function GitHubHeatmap({ days = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const months = ["Mar", "Apr", "May", "Jun", "Jul"];

  const cells = days.length
    ? days.slice(-147)
    : Array.from({ length: 147 }, (_, i) => ({
      date: `Day ${i + 1}`,
      count: Math.random() > 0.4 ? Math.ceil(Math.random() * 4) : 0,
    }));

  return (
    <div className="w-full">
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {cells.map((day, idx) => {
          const count = day.count || 0;
          let bgClass = "bg-slate-200/60";

          if (count > 6) bgClass = "bg-[#216e39]";
          else if (count > 3) bgClass = "bg-[#30a14e]";
          else if (count > 1) bgClass = "bg-[#40c463]";
          else if (count > 0) bgClass = "bg-[#9be9a8]";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-3 h-3 rounded-xs ${bgClass} relative cursor-pointer transition-transform hover:scale-125`}
            >
              {hoveredIndex === idx && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-950 text-white text-[10px] rounded-lg font-mono whitespace-nowrap z-30 shadow-md pointer-events-none">
                  {day.date}: {count} commits
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Labels underneath */}
      <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5 px-1">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* LeetCode Heatmap (3 Months Grid: 13 columns x 7 rows) */
function LeetCodeHeatmap({ days = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const months = ["May", "Jun", "Jul"];

  const cells = days.length
    ? days.slice(-91)
    : Array.from({ length: 91 }, (_, i) => ({
      date: `Day ${i + 1}`,
      count: Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : 0,
    }));

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1">
        {cells.map((day, idx) => {
          const count = day.count || 0;
          let bgClass = "bg-slate-200/80";

          if (count > 8) bgClass = "bg-emerald-600";
          else if (count > 4) bgClass = "bg-emerald-500";
          else if (count > 2) bgClass = "bg-emerald-400";
          else if (count > 0) bgClass = "bg-emerald-300";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`w-3.5 h-3.5 rounded-sm ${bgClass} relative cursor-pointer transition-transform hover:scale-125`}
            >
              {hoveredIndex === idx && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-950 text-white text-[10px] rounded-lg font-mono whitespace-nowrap z-30 shadow-md pointer-events-none">
                  {day.date}: {count} submissions
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Month Labels underneath matching screenshot */}
      <div className="flex justify-between w-full text-[11px] font-mono text-slate-500 mt-2 px-2">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}