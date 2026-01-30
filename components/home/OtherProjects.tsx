import React from "react";
import { Folder, Github, ExternalLink } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";

// Reusing or extending your project interface
interface MiniProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string; // Optional for some projects
}

const OtherProjects: React.FC = () => {
  const secondaryProjects: MiniProject[] = [
    {
      id: 1,
      title: "Social Media API",
      description:
        "RESTful API for a social media platform with authentication, posts, comments, and real-time notifications.",
      tags: ["Node.js", "Express", "Redis", "JWT"],
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Weather App",
      description:
        "A beautiful weather application with location-based forecasts and animated weather conditions.",
      tags: ["React Native", "API Integration", "Geolocation"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 3,
      title: "Portfolio Generator",
      description:
        "A CLI tool that generates stunning portfolio websites from a simple configuration file.",
      tags: ["Node.js", "CLI", "Templates", "NPM"],
      githubUrl: "#",
    },
  ];

  return (
    <section className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-light text-center mb-16 uppercase">
          Other Projects
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default OtherProjects;
