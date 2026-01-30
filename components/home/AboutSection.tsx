import React, { ReactNode } from "react";
import { Code2, Palette, Zap, Users } from "lucide-react";
import MiniHeader from "../ui/MiniHeader";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="About Me" number={1} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Component: Left Content (Description) */}
          <div className="space-y-6">
            <p className="text-lg text-dark-tertiary dark:text-soft-white leading-relaxed">
              I'm a passionate full-stack developer with over 2 years of
              experience building digital products. My journey started with a
              curiosity for how things work, which evolved into a career
              crafting modern web applications.
            </p>
            <p className="text-lg text-dark-tertiary dark:text-soft-white leading-relaxed">
              I specialize in{" "}
              <span className="text-primary font-bold">React</span>,{" "}
              <span className="text-primary font-bold">TypeScript</span>, and{" "}
              <span className="text-primary font-bold">Node.js</span>. I believe
              in writing code that not only works but is a joy to read and
              maintain.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-secondary">
              <div>
                <h3 className="text-3xl font-black text-primary">2+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Years Exp.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-primary">10+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Projects
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-primary">10+</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Clients
                </p>
              </div>
            </div>
          </div>

          {/* Component: Right Content (Feature Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon={<Code2 className="text-primary" size={28} />}
              title="Clean Code"
              desc="Writing maintainable, scalable, and efficient code."
            />
            <FeatureCard
              icon={<Palette className="text-primary" size={28} />}
              title="UI/UX Focus"
              desc="Creating intuitive and visually appealing interfaces."
            />
            <FeatureCard
              icon={<Zap className="text-primary" size={28} />}
              title="Performance"
              desc="Optimizing for speed and smooth user experiences."
            />
            <FeatureCard
              icon={<Users className="text-primary" size={28} />}
              title="Collaboration"
              desc="Working effectively in agile team environments."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

// Sub-component for individual Feature Cards
const FeatureCard = ({ icon, title, desc }: FeatureCardProps) => (
  <div className="p-8 bg-soft-white dark:bg-dark-primary border border-slate-200 dark:border-dark-secondary rounded-sm hover:border-primary transition-all group">
    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-dark-primary dark:text-soft-white mb-2">
      {title}
    </h4>
    <p className="text-sm text-dark-tertiary dark:text-soft-white leading-relaxed">
      {desc}
    </p>
  </div>
);

export default AboutSection;
