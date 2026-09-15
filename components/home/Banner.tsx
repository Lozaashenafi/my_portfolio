"use client";

import { Github, Linkedin, Mail, FileText, User, ChevronDown } from "lucide-react";
import loza from "../../public/photo.png";
import Link from "next/link";
import { motion } from "motion/react";

const Banner = () => {
  // Logic kept exactly as original
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const profession = "Full-Stack Developer";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Skills for the "Tag" section (Adjust these to your actual skills)
  const skills = ["React & Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"];

  return (
    <section
      id="Home"
      className="bg-white dark:bg-dark-primary min-h-screen  flex flex-col items-start justify-center px-6 md:px-20 lg:px-40 transition-colors duration-300 relative overflow-hidden py-16 md:py-0"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full flex flex-col gap-6"
      >
        {/* TOP SECTION: Photo + Name + Socials */}
        <div className="flex flex-row items-center gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-slate-200 dark:border-slate-800 flex-shrink-0"
          >
            <img src={loza.src} alt="Avatar" className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex flex-col">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-soft-white mb-2"
            >
              Loza
            </motion.h1>

            {/* Social Links Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-dark-secondary dark:text-soft-white/60">
              <a href="https://github.com/Lozaashenafi" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium">
                <Github size={18} /> <span className="hidden sm:inline">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/loza-ashenafi-64647042b/" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium">
                <Linkedin size={18} /> <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a href="mailto:lozaashenafi@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-medium">
                <Mail size={18} /> <span className="hidden sm:inline">Email</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* MIDDLE SECTION: Description & Typewriter */}
        <div className="space-y-6">
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-dark-secondary dark:text-soft-white/90 leading-relaxed max-w-2xl"
          >
            I craft beautiful, functional, and scalable web applications using modern technologies and best practices.
          </motion.p>

          {/* Skill Tags - Restructured like the image */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 items-center">
            <span className="text-dark-secondary dark:text-soft-white/70 mr-1">I've dipped my toes in</span>
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-slate-100 dark:bg-slate-800/50 text-dark-secondary dark:text-soft-white/80 px-3 py-1 rounded-sm border border-slate-200 dark:border-slate-700 text-sm md:text-base"
              >
                {skill}
              </span>
            ))}
            <span className="bg-primary dark:bg-primary text-white px-3 py-1 rounded-sm text-sm md:text-base font-bold shadow-lg">
              and your next big idea.
            </span>
          </motion.div>

          {/* Typewriter Effect - Integrated as the "footer" text of the content */}
          <motion.h2
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-sm md:text-base text-dark-secondary dark:text-soft-white/60 flex items-center h-6 italic"
          >
            I am a&nbsp;
            {profession.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1 w-[2px] h-4 bg-primary"
            ></motion.span>
          </motion.h2>
        </div>

        {/* BOTTOM SECTION: Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-4"
        >
          <Link
            href="/resume.pdf"
            className="bg-dark-primary dark:bg-soft-white text-soft-white dark:text-dark-primary px-6 py-3 font-bold rounded-md flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <FileText size={20} /> Download Resume
          </Link>
          <Link
            href="#projects"
            className="bg-slate-200 dark:bg-slate-800 text-dark-primary dark:text-soft-white px-6 py-3 font-bold rounded-md flex items-center gap-3 transition-all hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95"
          >
            <span className="opacity-40 font-mono text-sm">99</span> More about me
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-6 md:left-20 flex flex-col items-center text-dark-secondary/30 dark:text-soft-white/20"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;