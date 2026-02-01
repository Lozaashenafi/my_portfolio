"use client";
import React, { useState } from "react";
import MiniHeader from "../ui/MiniHeader";

interface ExperienceProps {
  // Mapping our Prisma model fields to the UI expectations
  data: any[];
}

const Experience = ({ data }: ExperienceProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // If no data exists, don't break the UI
  if (!data || data.length === 0) return null;

  // Helper to format the date range
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
      className="bg-white dark:bg-dark-primary py-20 px-8 md:px-14"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Experiences" number={3} />

        <div className="flex flex-col md:flex-row gap-8 min-h-[300px]">
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate-200 dark:border-dark-tertiary">
            {data.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-3 text-left font-mono text-sm whitespace-nowrap transition-all duration-200 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:mb-0 md:-ml-[2px] 
                  ${
                    activeTab === index
                      ? "text-primary border-primary bg-primary/5"
                      : "text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-dark-secondary hover:text-primary"
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow pt-2">
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
              {/* description is already a string[] in your updated Prisma schema */}
              {data[activeTab].description.map((item: string, i: number) => (
                <li
                  key={i}
                  className="relative pl-6 text-sm md:text-base text-dark-tertiary dark:text-gray-400 leading-relaxed"
                >
                  <span className="absolute left-0 text-primary">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
