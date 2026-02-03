"use client";

import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import loza from "../../public/photo.png";
import Link from "next/link";
import { motion } from "motion/react"; // 2026 Import standard

const Banner = () => {
  // Variants for staggered children (the text flying in)
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

  // Typewriter effect logic
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

  return (
    <section
      id="Home"
      className="bg-light dark:bg-dark-primary min-h-screen flex flex-col items-center justify-center px-10 md:px-8 transition-colors duration-300 relative overflow-hidden py-24 md:py-0"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:mt-[-5vh]"
      >
        {/* Left Side: Content */}
        <div className="w-full md:w-3/5 text-center md:text-left z-10">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start space-x-3 mb-4 md:mb-6"
          >
            <div className="hidden md:block w-8 h-[2px] bg-primary"></div>
            <span className="text-secondary dark:text-primary font-mono font-bold uppercase tracking-widest text-xs md:text-sm">
              Hello, I'm
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-soft-white mb-4 leading-tight md:leading-[1.1]"
          >
            Loza,{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #b91c1c" }}
            >
              Developer
            </span>
          </motion.h1>

          {/* Typewriter Effect for Title */}
          <motion.h2
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-2xl text-dark-secondary dark:text-soft-white mb-6 flex items-center justify-center md:justify-start h-8"
          >
            {profession.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1 w-1 h-6 md:w-1.5 md:h-8 bg-primary dark:bg-secondary"
            ></motion.span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-dark-secondary dark:text-soft-white max-w-lg mb-8 md:mb-10 text-sm md:text-lg mx-auto md:mx-0 leading-relaxed opacity-90"
          >
            I craft exceptional digital experiences with clean code and
            pixel-perfect designs. Specializing in modern web technologies.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
          >
            <Link
              href="#projects"
              className="bg-primary hover:bg-secondary text-soft-white px-8 py-3 md:px-10 md:py-4 font-bold rounded-sm shadow-xl transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="border-2 border-dark-secondary dark:border-soft-white text-dark-primary dark:text-soft-white px-8 py-3 md:px-10 md:py-4 font-bold hover:bg-dark-secondary dark:hover:bg-soft-white hover:text-soft-white dark:hover:text-dark-primary transition-all active:scale-95 text-center flex items-center justify-center"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image with Entrance Motion Only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full md:w-2/5 flex justify-center relative"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden z-10 border-4 border-transparent bg-light dark:bg-dark-primary">
            <img
              src={loza.src}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Static Glow (Optional: Removed the pulsing animation) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[60px] md:blur-[100px] z-0 opacity-10"></div>
        </motion.div>
      </motion.div>

      {/* Footer Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 md:absolute md:bottom-10 left-0 right-0 flex flex-col items-center space-y-6"
      >
        <div className="hidden md:flex flex-col items-center text-dark-secondary dark:text-soft-white">
          <span className="text-[10px] uppercase tracking-widest mb-2 font-bold">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>

        <div className="flex space-x-8 md:space-x-6 text-dark-secondary dark:text-soft-white">
          {[
            {
              icon: <Github size={24} />,
              href: "https://github.com/Lozaashenafi",
            },
            {
              icon: <Linkedin size={24} />,
              href: "https://www.linkedin.com/in/loza-ashenafi-773263286/",
            },
            { icon: <Mail size={24} />, href: "mailto:lozaashenafi@gmail.com" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              whileHover={{ scale: 1.2, color: "#b91c1c" }}
              whileTap={{ scale: 0.9 }}
              className="transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
