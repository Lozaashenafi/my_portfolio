// src/components/ui/ProjectCard.tsx
import React from "react";
import { Github, ExternalLink } from "lucide-react";

// 1. Export the interface so other files can use it
export interface MiniProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

// 2. Define the props interface
interface CardProps {
  project: MiniProject;
}

// 3. Use React.FC with the CardProps interface
const ProjectCard: React.FC<CardProps> = ({ project }) => {
  return (
    <div className="bg-soft-white dark:bg-dark-secondary p-8 border border-slate-200 dark:border-dark-tertiary rounded-sm hover:-translate-y-2 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-8">
        <div className="text--primary opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-3xl font-mono">{"{ }"}</span>
        </div>
        <div className="flex space-x-4 text-dark-tertiary dark:text-soft-white">
          <a
            href={project.githubUrl}
            className="hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="hover:text-primary transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-light mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-dark-tertiary dark:text-soft-white text-sm leading-relaxed mb-8">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-bold font-mono text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
          >
            {" "}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
