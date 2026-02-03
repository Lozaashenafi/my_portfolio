"use client";
import React from "react";
import { motion } from "framer-motion";
import SkillTag from "../ui/SkillTag";

interface Skill {
  id: string;
  name: string;
  category: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.05 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function SkillsContent({
  allSkills,
  categories,
}: {
  allSkills: Skill[];
  categories: any[];
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
    >
      {categories.map((cat) => {
        const filteredSkills = allSkills.filter((s) => s.category === cat.key);
        if (filteredSkills.length === 0) return null;

        return (
          <motion.div
            key={cat.title}
            variants={columnVariants}
            className="space-y-8"
          >
            <div className="flex items-center space-x-4">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                className="h-[2px] bg-primary"
              />
              <h3 className="text-xl font-bold text-dark-secondary dark:text-soft-white uppercase tracking-tight">
                {cat.title}
              </h3>
            </div>

            <motion.div className="flex flex-wrap gap-3">
              {filteredSkills.map((skill) => (
                <motion.div key={skill.id} variants={tagVariants}>
                  <SkillTag name={skill.name} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
