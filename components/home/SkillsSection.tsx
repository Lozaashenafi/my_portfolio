import React from "react";
import SkillTag from "../ui/SkillTag";
import MiniHeader from "../ui/MiniHeader";

// Types for the skill categories
interface SkillCategory {
  title: string;
  skills: string[];
}

const SkillsSection: React.FC = () => {
  const skillGroups: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        "React / Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "REST / GraphQL"],
    },
    {
      title: "Tools & DevOps",
      skills: ["Git / GitHub", "Docker", "AWS / Vercel", "CI/CD"],
    },
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
          {skillGroups.map((group) => (
            <div key={group.title} className="space-y-8">
              {/* Category Sub-heading */}
              <div className="flex items-center space-x-4">
                <span className="h-[2px] w-8 bg-primary)]"></span>
                <h3 className="text-xl font-bold text-dark-secondary dark:text-soft-white">
                  {group.title}
                </h3>
              </div>

              {/* Skill Tags Grid */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
