import React from "react";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-white dark:bg-dark-primary border-t border-soft-white dark:border-dark-tertiary py-6 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-2">
          <span className="text-primary font-mono text-xl font-bold tracking-tighter">
            &lt;dev/&gt;
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-dark-tertiary dark:text-soft-white">
          <a
            href="#"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
        </div>

        <div className="flex items-center gap-2 font-mono text-sm text-dark-tertiary dark:text-soft-white">
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
