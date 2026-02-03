"use client";

import React, { ReactNode } from "react";
import { Code2, Palette, Zap, Users, ShieldCheck, Cpu } from "lucide-react";
import MiniHeader from "../ui/MiniHeader";
import { motion, Variants } from "motion/react"; // Import Variants type

const AboutSection = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }, // Now TS knows this is valid
    },
  };

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind",
    "MongoDB",
    "PostgreSQL",
    "Framer Motion",
  ];

  return (
    <section
      id="about"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <MiniHeader title="About Me" number={1} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
          {/* Left Content (Description) */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-dark-tertiary dark:text-soft-white leading-relaxed">
                I'm a passionate full-stack developer with over 2 years of
                experience building digital products. My journey started with a
                curiosity for how things work, which evolved into a career
                crafting modern web applications.
              </p>
              <p className="text-lg text-dark-tertiary dark:text-soft-white leading-relaxed">
                I believe in writing code that not only works but is a joy to
                read and maintain. I focus on creating
                <span className="text-primary font-bold">
                  {" "}
                  high-performance
                </span>{" "}
                and
                <span className="text-primary font-bold"> scalable</span>{" "}
                solutions.
              </p>
            </motion.div>
          </div>

          {/* Right Content (Feature Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              delay={0.1}
              icon={<Code2 className="text-primary" size={28} />}
              title="Clean Code"
              desc="Writing maintainable, scalable, and efficient code."
            />
            <FeatureCard
              delay={0.2}
              icon={<Palette className="text-primary" size={28} />}
              title="UI/UX Focus"
              desc="Creating intuitive and visually appealing interfaces."
            />
            <FeatureCard
              delay={0.3}
              icon={<Zap className="text-primary" size={28} />}
              title="Performance"
              desc="Optimizing for speed and smooth user experiences."
            />
            <FeatureCard
              delay={0.4}
              icon={<Cpu className="text-primary" size={28} />}
              title="Architecture"
              desc="Building robust backends and database schemas."
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  delay: number;
}

// Updated FeatureCard with Motion
const FeatureCard = ({ icon, title, desc, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="p-8 bg-soft-white dark:bg-dark-primary border border-slate-200 dark:border-dark-secondary rounded-sm hover:border-primary transition-all group"
  >
    <div className="mb-4 group-hover:rotate-12 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-dark-primary dark:text-soft-white mb-2">
      {title}
    </h4>
    <p className="text-sm text-dark-tertiary dark:text-soft-white leading-relaxed">
      {desc}
    </p>
  </motion.div>
);

export default AboutSection;
