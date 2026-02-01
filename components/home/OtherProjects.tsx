// components/home/OtherProjects.tsx
import React from "react";
import ProjectCard from "../ui/ProjectCard";
import prisma from "../../lib/prisma";

const OtherProjects = async () => {
  // 1. Fetch projects from database that are NOT highlighted
  const projectsFromDb = await prisma.project.findMany({
    where: {
      published: true,
      highlighted: false, // Only show non-highlighted projects here
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. If no secondary projects exist, don't show the section
  if (projectsFromDb.length === 0) {
    return null;
  }

  // 3. Map the database results to the format the ProjectCard expects
  const formattedProjects = projectsFromDb.map((project) => ({
    id: project.id, // Prisma IDs are strings (cuid)
    title: project.title,
    description: project.description,
    githubUrl: project.githubUrl || "#",
    liveUrl: project.liveUrl || undefined,
    tags: project.skills.map((s) => s.skill.name),
  }));

  return (
    <section className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-light text-center mb-16 uppercase">
          Other Projects
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formattedProjects.map((project) => (
            <ProjectCard key={project.id} project={project as any} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProjects;
