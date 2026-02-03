"use client";
import { Project, Skill, SkillsOnProjects } from "@prisma/client";
import { Github, ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion"; // Added Variants type

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
  // 1. Explicitly type variants to fix TS errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This handles the children timing
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: reverse ? -20 : 20, // Slide in from the side based on layout
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 mb-5"
    >
      {/* 1. Project Content (Text) */}
      <div
        className={`relative z-20 col-span-1 md:col-span-7 flex flex-col 
          ${reverse ? "md:col-start-1 items-start text-left" : "md:col-start-6 items-end md:text-right text-left"}`}
      >
        <motion.p
          variants={itemVariants}
          className="text-primary font-mono text-sm mb-2 font-semibold uppercase tracking-widest"
        >
          Featured Project
        </motion.p>

        <motion.h3
          variants={itemVariants}
          className="text-3xl md:text-4xl font-black text-dark-primary dark:text-soft-white mb-6"
        >
          {project.title}
        </motion.h3>

        {/* Added a hover "lift" to the description box */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-soft-white dark:bg-dark-secondary p-6 border border-light dark:border-dark-tertiary mb-6 w-full "
        >
          <p className="text-dark-tertiary dark:text-soft-white leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
        </motion.div>

        {/* Skill tags with individual hover effects */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-wrap gap-3 mb-8 ${reverse ? "justify-start" : "md:justify-end justify-start"}`}
        >
          {project.skills?.map((item) => (
            <motion.span
              key={item.skill.id}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(var(--primary), 0.2)",
              }}
              className="text-xs font-bold font-mono text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20 cursor-default"
            >
              {item.skill.name}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-6 text-slate-600 dark:text-gray-400"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                <Github size={22} />
              </motion.div>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                <ExternalLink size={22} />
              </motion.div>
            </a>
          )}
        </motion.div>
      </div>

      {/* 2. Project Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }} // Slide in from opposite direction of text
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className={`relative col-span-1 md:col-span-8 aspect-video group overflow-hidden rounded-sm border border-slate-200 dark:border-dark-tertiary shadow-2xl
          ${reverse ? "md:col-start-5" : "md:col-start-1 md:row-start-1"}`}
      >
        <div className="relative w-full h-full bg-slate-100 dark:bg-dark-secondary">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <span className="font-mono text-sm">No Image Available</span>
            </div>
          )}

          {/* Overlay logic: Primary tint that clears on hover */}
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-500"></div>

          {/* Bottom shadow for text legibility on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProject;
