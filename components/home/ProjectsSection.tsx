"use client";
import React from "react";
import FeaturedProject from "./FeaturedProject";
import MiniHeader from "../ui/MiniHeader";

const ProjectsSection: React.FC = () => {
  // Use "any" temporarily for mock data if you don't want to write every Prisma field
  // But we format the skills to match the join-table structure
  const projects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      slug: "e-commerce-platform",
      description:
        "A full-featured online store with payment processing. Built with React and Node.js.",
      githubUrl: "#",
      liveUrl: "#",
      skills: [
        { skill: { id: "s1", name: "React" } },
        { skill: { id: "s2", name: "PostgreSQL" } },
      ],
      // Adding empty/default values for missing Prisma fields
      content: "",
      coverImage: null,
      featured: true,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: null,
    },
  ];

  return (
    <section
      id="projects"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Projects" number={2} />

        {projects.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project as any}
            reverse={index % 2 !== 0} // This handles the alternating layout
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
