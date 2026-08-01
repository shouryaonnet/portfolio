export const stats = [
  {
    icon: "💻",
    value: "500+",
    label: "Problems Solved",
    color: "slate",
    detail: {
      title: "LeetCode Breakdown",
      lines: [
        { text: "Easy: 200", dot: "#22c55e" },
        { text: "Medium: 270", dot: "#eab308" },
        { text: "Hard: 40", dot: "#ef4444" },
      ],
      note: "Keep solving, keep growing! Consistency is the key.",
    },
  },
  {
    icon: "📁",
    value: "3+",
    label: "Projects",
    color: "blue",
    detail: {
      title: "Featured Work",
      lines: [
        { text: "Portfolio Site" },
        { text: "E-commerce App" },
        { text: "Task Manager" },
      ],
    },
  },
  {
    icon: "🔥",
    value: "128",
    label: "Day Streak",
    color: "green",
    detail: {
      title: "Streak Details",
      lines: [
        { text: "Current: 128 days" },
        { text: "Longest: 150 days" },
      ],
    },
  },
  {
    icon: "🎓",
    value: "2027",
    label: "B.Tech CSE",
    color: "orange",
    detail: {
      title: "Education",
      lines: [
        { text: "Your College Name" },
        { text: "CGPA: 8.5 / 10" },
      ],
    },
  },
  {
    icon: "🧩",
    value: "15+",
    label: "Technologies",
    color: "slate",
    type: "chips",
    techs: [
      { icon: "☕", name: "Java", level: "Advanced" },
      { icon: "🍃", name: "Spring Boot", level: "Advanced" },
      { icon: "⚛️", name: "React", level: "Intermediate" },
      { icon: "▲", name: "Next.js", level: "Intermediate" },
      { icon: "🐳", name: "Docker", level: "Familiar" },
      { icon: "🔧", name: "Git", level: "Advanced" },
      { icon: "🍃", name: "MongoDB", level: "Intermediate" },
      { icon: "🗄️", name: "MySQL", level: "Advanced" },
      { icon: "🟢", name: "Node.js", level: "Intermediate" },
      { icon: "🔌", name: "REST APIs", level: "Advanced" },
      { icon: "🎨", name: "TailwindCSS", level: "Intermediate" },
      { icon: "🐧", name: "Linux", level: "Familiar" },
    ],
  },
];

// true = active day, false = inactive. Placeholder data — we can wire
// this up to the real GitHub API later.
export const heatmapData = Array.from({ length: 72 }, () => Math.random() > 0.3);