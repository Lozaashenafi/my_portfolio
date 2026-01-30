"use client";
import { Project, Skill, SkillsOnProjects } from "@prisma/client";
import { Github, ExternalLink, Code } from "lucide-react";

type ProjectWithSkills = Project & {
  skills?: (SkillsOnProjects & {
    skill: Skill;
  })[];
};

interface FeaturedProps {
  project: ProjectWithSkills;
  reverse?: boolean;
}

const FeaturedProject: React.FC<FeaturedProps> = ({ project, reverse }) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4">
      {/* 1. Project Content (Text) */}
      <div
        className={`relative z-20 col-span-1 md:col-span-7 flex flex-col 
          ${reverse ? "md:col-start-1 items-start text-left" : "md:col-start-6 items-end text-right"}`}
      >
        <p className="text-primary font-mono text-sm mb-2 font-semibold uppercase tracking-widest">
          Featured Project
        </p>
        <h3 className="text-3xl md:text-4xl font-black text-dark-primary dark:text-soft-white mb-6 transition-colors">
          {project.title}
        </h3>

        {/* Floating Description Box */}
        <div className="bg-soft-white dark:bg-dark-secondary p-6 border border-light dark:border-dark-tertiary  mb-6 w-full">
          <p className="text-dark-tertiary dark:text-soft-white leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {project.skills?.map((item) => (
            <span
              key={item.skill.id}
              className="text-xs font-bold font-mono text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
            >
              {item.skill.name}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center space-x-6 text-slate-600 dark:text-gray-400">
          <a
            href={project.githubUrl ?? "#"}
            className="hover:text--primary transition-transform hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={project.liveUrl ?? "#"}
            className="hover:text-primary transition-transform hover:-translate-y-1"
            target="_blank"
            rel="noopener noreferrer"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* 2. Project Image (Background/Overlay Style) */}
      <div
        className={`relative col-span-1 md:col-span-8 aspect-video group
          ${reverse ? "md:col-start-5" : "md:col-start-1 md:row-start-1"}`}
      >
        <div className="relative w-full h-full bg-slate-100 dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary rounded-sm overflow-hidden flex items-center justify-center">
          {/* Mockup Icon */}
          <Code
            className="text-primary opacity-10 group-hover:opacity-30 transition-opacity duration-500"
            size={120}
          />

          {/* Color Tint Overlay */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500"></div>

          {/* Subtle Gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
