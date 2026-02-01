// components/home/ProjectsSection.tsx
import React from "react";
import FeaturedProject from "./FeaturedProject";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";

const ProjectsSection = async () => {
  // Fetch ONLY projects that are published AND highlighted
  const highlightedProjects = await prisma.project.findMany({
    where: {
      published: true,
      highlighted: true,
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // If there are no highlighted projects, we don't render the section
  if (highlightedProjects.length === 0) return null;

  return (
    <section
      id="projects"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Projects" number={2} />

        {highlightedProjects.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project as any}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
