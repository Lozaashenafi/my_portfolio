// components/home/SkillsSection.tsx
import React from "react";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";
import SkillsContent from "./SkillsContent"; // Import the client part

const SkillsSection = async () => {
  const allSkills = await prisma.skill.findMany({
    orderBy: { name: "asc" },
  });

  const categories = [
    { title: "Frontend", key: "FRONTEND" },
    { title: "Backend", key: "BACKEND" },
    { title: "Tools & DevOps", key: "TOOLS" },
  ];

  return (
    <section
      id="skills"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Skills & Tools" number={3} />

        {/* Pass the data to the Client Component */}
        <SkillsContent allSkills={allSkills} categories={categories} />
      </div>
    </section>
  );
};

export default SkillsSection;
