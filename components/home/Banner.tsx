import React from "react";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import loza from "../../public/photo.png";

const Banner = () => {
  return (
    <section className="bg-light dark:bg-dark-primary min-h-screen flex flex-col items-center justify-center px-4 md:px-6 transition-colors duration-300 relative overflow-hidden py-20 md:py-0">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:mt-[-5vh]">
        {/* Text Content */}
        <div className="w-full md:w-3/5 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-4 md:mb-6">
            <div className="hidden md:block w-8 h-[2px] bg-primary"></div>
            <span className="text-secondary dark:text-primary font-mono font-bold uppercase tracking-widest text-xs md:text-sm">
              Hello, I'm
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-soft-white mb-4 leading-tight md:leading-[1.1]">
            Loza,{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #b91c1c" }}
            >
              Developer
            </span>
          </h1>

          <h2 className="text-lg md:text-2xl text-dark-secondary dark:text-soft-white mb-6 flex items-center justify-center md:justify-start">
            Full-Stack Developer
            <span className="ml-3 w-1 h-6 md:w-1.5 md:h-8 bg-primary dark:bg-secondary animate-pulse"></span>
          </h2>

          <p className="text-dark-secondary dark:text-soft-white max-w-lg mb-8 md:mb-10 text-sm md:text-lg mx-auto md:mx-0 leading-relaxed opacity-90">
            I craft exceptional digital experiences with clean code and
            pixel-perfect designs. Specializing in modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <button className="bg-primary hover:bg-secondary text-soft-white px-8 py-3 md:px-10 md:py-4 font-bold rounded-sm shadow-xl transition-all hover:scale-105 active:scale-95">
              View My Work
            </button>
            <button className="border-2 border-dark-secondary dark:border-soft-white text-dark-primary dark:text-soft-white px-8 py-3 md:px-10 md:py-4 font-bold hover:bg-dark-secondary dark:hover:bg-soft-white hover:text-soft-white dark:hover:text-dark-primary transition-all active:scale-95">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full md:w-2/5 flex justify-center relative">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-4 border-white/10 dark:border-dark-secondary bg-light dark:bg-dark-primary z-10">
            <img
              src={loza.src}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[60px] md:blur-[100px] z-0"></div>
        </div>
      </div>

      {/* Bottom Section: Scroll & Socials */}
      {/* Changed to relative on very small screens to prevent overlapping */}
      <div className="mt-12 md:absolute md:bottom-10 left-0 right-0 flex flex-col items-center space-y-6">
        <div className="hidden md:flex flex-col items-center animate-bounce text-dark-secondary dark:text-soft-white">
          <span className="text-[10px] uppercase tracking-widest mb-2 font-bold">
            Scroll
          </span>
          <ChevronDown size={18} />
        </div>

        <div className="flex space-x-8 md:space-x-6 text-dark-secondary dark:text-soft-white">
          <a
            href="#"
            className="hover:text-primary transition-colors transform hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors transform hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors transform hover:scale-110"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
