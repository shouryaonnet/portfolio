"use client";

import { useRef } from "react";
import { projects } from "@/data/projects";

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      className="project-card bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)" }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="project-title text-xl font-extrabold text-slate-900 mb-0 tracking-tight">{project.title}</h3>
          <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            {project.duration}
          </span>
        </div>

        {project.subtitle && (
          <p className="text-xs font-bold text-slate-700 mb-3 tracking-wide uppercase">{project.subtitle}</p>
        )}

        <p className="project-desc text-sm text-slate-600 leading-relaxed mb-6">{project.description}</p>

        <div className="project-tags flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="project-links flex items-center gap-3 pt-4 border-t border-slate-100">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
        >
          <span>Live Demo</span>
          <span>↗</span>
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/80 font-bold text-xs transition-colors flex items-center gap-1.5"
        >
          <span>GitHub Source</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section pt-4 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-[94%] mx-auto">
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
        Featured Projects
      </p>
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-7">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}