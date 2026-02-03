"use client";
import React, { useState } from "react";
import MiniHeader from "../ui/MiniHeader";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import motion

interface ExperienceProps {
  data: any[];
}

const Experience = ({ data }: ExperienceProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!data || data.length === 0) return null;

  const formatPeriod = (start: Date, end: Date | null, current: boolean) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "numeric",
    };
    const startStr = new Date(start).toLocaleDateString("en-US", options);
    const endStr = current
      ? "Present"
      : end
        ? new Date(end).toLocaleDateString("en-US", options)
        : "";
    return `${startStr} - ${endStr}`;
  };

  return (
    <section
      id="experience"
      className="bg-white dark:bg-dark-primary py-20 px-8 md:px-14 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <MiniHeader title="Experiences" number={3} />

        <div className="flex flex-col md:flex-row gap-8 min-h-[400px] mt-10">
          {/* 2. Tab List with Sliding Indicator */}
          <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-200 dark:border-dark-tertiary">
            {data.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-5 py-3 text-left font-mono text-sm whitespace-nowrap transition-colors duration-300 
                  ${activeTab === index ? "text-primary" : "text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-dark-secondary"}`}
              >
                {/* 3. The "Magic" Sliding Line */}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] md:h-full md:w-[2px] bg-primary md:top-0 md:bottom-auto"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {exp.company}
              </button>
            ))}
          </div>

          {/* 4. Content Area with AnimatePresence */}
          <div className="flex-grow pt-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab} // Crucial: triggers animation when tab changes
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="text-xl font-bold text-dark-primary dark:text-soft-white">
                  <span>{data[activeTab].role}</span>
                  <span className="text-primary">
                    {" "}
                    @{" "}
                    <a
                      href={data[activeTab].companyWebsite || "#"}
                      target="_blank"
                      className="hover:underline transition-all"
                    >
                      {data[activeTab].company}
                    </a>
                  </span>
                </h3>

                <p className="font-mono text-xs text-slate-500 dark:text-gray-400 mt-1 mb-6">
                  {formatPeriod(
                    data[activeTab].startDate,
                    data[activeTab].endDate,
                    data[activeTab].current,
                  )}
                </p>

                <ul className="space-y-4">
                  {data[activeTab].description.map(
                    (item: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }} // Staggered entry for bullet points
                        className="relative pl-6 text-sm md:text-base text-dark-tertiary dark:text-gray-400 leading-relaxed"
                      >
                        <span className="absolute left-0 text-primary">▹</span>
                        {item}
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
