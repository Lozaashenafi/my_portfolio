"use client";
import { Project, Skill, SkillsOnProjects } from "@prisma/client";
import { Github, ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";

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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: reverse ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Helper to determine the main link
  const mainLink = project.liveUrl || project.githubUrl || "#";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 mb-20 md:mb-32 group"
    >
      {/* 
        MOBILE ONLY LINK OVERLAY 
        This makes the entire card clickable on mobile, but disappears on desktop 
        to allow individual link clicking (GitHub vs External).
      */}
      <a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-30 md:hidden"
        aria-label={`View ${project.title}`}
      />

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
          className="text-2xl md:text-4xl font-black text-dark-primary dark:text-soft-white mb-4 md:mb-6"
        >
          {project.title}
        </motion.h3>

        {/* Description Box */}
        <motion.div
          variants={itemVariants}
          // Only lift on hover for desktop
          whileHover={{ y: -5 }}
          className="bg-soft-white dark:bg-dark-secondary p-5 md:p-6 border border-light dark:border-dark-tertiary mb-6 w-full shadow-xl md:shadow-none"
        >
          <p className="text-dark-tertiary dark:text-soft-white leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
        </motion.div>

        {/* Skill tags */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-wrap gap-2 md:gap-3 mb-8 ${reverse ? "justify-start" : "md:justify-end justify-start"}`}
        >
          {project.skills?.map((item) => (
            <span
              key={item.skill.id}
              className="text-[10px] md:text-xs font-bold font-mono text-primary bg-primary/10 px-3 py-1 rounded-sm border border-primary/20"
            >
              {item.skill.name}
            </span>
          ))}
        </motion.div>

        {/* Links - Hidden on mobile because the whole card is a link, or kept for accessibility */}
        <motion.div
          variants={itemVariants}
          className="relative z-40 flex items-center space-x-6 text-slate-600 dark:text-gray-400"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
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
              <motion.div
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={22} />
              </motion.div>
            </a>
          )}
        </motion.div>
      </div>

      {/* 2. Project Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className={`relative col-span-1 md:col-span-8 aspect-video overflow-hidden rounded-sm border border-slate-200 dark:border-dark-tertiary shadow-xl
          ${reverse ? "md:col-start-5" : "md:col-start-1 md:row-start-1"}`}
      >
        <div className="relative w-full h-full bg-slate-100 dark:bg-dark-secondary">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              /* 
                 Change: Image is color by default on mobile, 
                 grayscale only on desktop (md:) and reveals on hover 
              */
              className="w-full h-full object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <span className="font-mono text-sm">No Image Available</span>
            </div>
          )}

          {/* Overlay logic: Only apply tint on desktop */}
          <div className="hidden md:block absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-500"></div>

          {/* Gradient for mobile legibility (always visible on mobile) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProject;
