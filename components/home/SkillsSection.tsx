// components/home/SkillsSection.tsx
import React from "react";
import SkillTag from "../ui/SkillTag";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";

const SkillsSection = async () => {
  // 1. Fetch all skills from the database
  const allSkills = await prisma.skill.findMany({
    orderBy: { name: "asc" },
  });

  // 2. Define the display mapping to match your UI categories with DB Enums
  const categories = [
    { title: "Frontend", key: "FRONTEND" },
    { title: "Backend", key: "BACKEND" },
    { title: "Tools & DevOps", key: "TOOLS" },
  ];

  return (
    <section
      id="skills"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Skills & Tools" number={3} />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {categories.map((cat) => {
            // 3. Filter skills for this specific column
            const filteredSkills = allSkills.filter(
              (skill) => skill.category === cat.key,
            );

            // Hide the column if there are no skills assigned to it yet
            if (filteredSkills.length === 0) return null;

            return (
              <div key={cat.title} className="space-y-8">
                {/* Category Sub-heading */}
                <div className="flex items-center space-x-4">
                  <span className="h-[2px] w-8 bg-primary"></span>
                  <h3 className="text-xl font-bold text-dark-secondary dark:text-soft-white uppercase tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Skill Tags Grid */}
                <div className="flex flex-wrap gap-3">
                  {filteredSkills.map((skill) => (
                    <SkillTag key={skill.id} name={skill.name} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
