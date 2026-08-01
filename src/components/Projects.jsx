"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -3 }}
      className="group bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between min-h-[330px]"
    >
      <div>
        {/* Top */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {/* Project Icon */}
            <div className="w-9 h-9 rounded-lg bg-[#f8fafc] border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FolderGit2
                size={17}
                strokeWidth={1.8}
                className="text-slate-800"
              />
            </div>

            <div>
              {/* Project Title */}
              <h3 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Project Number */}
          <span className="text-[11px] font-mono font-medium text-slate-400 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Role + Duration */}
        <div className="flex items-center gap-2.5 mb-4 text-[11px]">
          {project.role && (
            <span className="font-semibold text-slate-700">
              {project.role}
            </span>
          )}

          {project.role && project.duration && (
            <span className="w-1 h-1 rounded-full bg-slate-300" />
          )}

          {project.duration && (
            <span className="text-slate-400">
              {project.duration}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-[1.7] mb-4 max-w-xl">
          {project.description}
        </p>

        {/* Project Highlights */}
        {project.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
            {project.highlights.map((item) => (
              <span
                key={item}
                className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-[#f8fafc] border border-slate-200/80 text-[10.5px] font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between gap-4 pt-4 mt-6 border-t border-slate-100">
        {/* Small Status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />

          <span className="text-[10.5px] text-slate-400 font-medium">
            Featured Project
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-950 text-[11px] font-medium transition-all duration-200 flex items-center gap-1.5"
            >
              <FaGithub className="w-[13px] h-[13px]" />
              <span>Source Code</span>
            </a>
          )}

          {/* Live Demo */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#0b0f19] hover:bg-slate-800 text-white text-[11px] font-medium transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Live Demo</span>

              <ExternalLink
                size={12}
                strokeWidth={1.8}
              />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="projects-section pt-4 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] mb-1.5">
            Featured Projects
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Selected work
          </h2>

          <p className="text-[13px] text-slate-500 mt-1.5">
            A closer look at some of the projects I've designed and built.
          </p>
        </div>

        {/* Project Count */}
        <span className="hidden sm:block text-[11px] text-slate-400 font-medium">
          {String(projects.length).padStart(2, "0")} Projects
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200/80 mb-6" />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}