"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "Achievements", id: "achievements" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActive(id);

    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-full px-3">
      <nav className="flex items-center gap-2 sm:gap-4 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 text-slate-800">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-bold text-slate-950 text-sm tracking-tight pr-2 sm:pr-3 border-r border-slate-200 flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span>shourya</span>
          <span className="text-emerald-500 font-mono font-bold">.dev</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-full ${isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    className="absolute inset-0 bg-slate-100 rounded-full -z-10 shadow-2xs border border-slate-200/80"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}