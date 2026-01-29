import React from "react";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import loza from "../../public/photo.png";

const Banner = () => {
  return (
    <section className="bg-light dark:bg-dark-primary min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-300 relative overflow-hidden ">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 mt-[-5vh] px-12">
        {/* Text Content */}
        <div className="w-full md:w-3/5 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
            <span className=" w-8 bg-primary"></span>
            <span className="text-secondary dark:text-primary font-mono font-bold uppercase tracking-tighter text-sm">
              Hello, I'm
            </span>
            <span className=" w-8 bg-primary"></span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-soft-white mb-4 leading-[1.1]">
            Loza,{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px #b91c1c" }}
            >
              Developer
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-dark-secondary dark:text-soft-white mb-6 flex items-center justify-center md:justify-start">
            Full-Stack Developer
            <span className="ml-3 w-1.5 h-8 bg-primary dark:bg-secondary animate-pulse"></span>
          </h2>

          <p className="text-dark-secondary dark:text-soft-white max-w-lg mb-10 text-base md:text-lg mx-auto md:mx-0 leading-relaxed">
            I craft exceptional digital experiences with clean code and
            pixel-perfect designs. Specializing in modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <button className="bg-primary hover:bg-secondary text-soft-white px-10 py-4 font-bold rounded-sm shadow-xl transition-all hover:scale-105">
              View My Work
            </button>
            <button className="border-2 border-dark-secondary dark:border-soft-white text-dark-primary dark:text-soft-white px-10 py-4 font-bold hover:bg-dark-secondary dark:hover:bg-soft-white hover:text-soft-white dark:hover:text-dark-primary transition-all">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full md:w-2/5 flex justify-center relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden dark:border-dark-secondary   bg-light dark:bg-dark-primary">
            <img
              src={loza.src}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 rounded-full blur-[100px] -z-0"></div>
        </div>
      </div>

      {/* Bottom Section: Scroll & Socials */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center animate-bounce text-dark-secondary dark:text-soft-white">
          <span className="text-xs uppercase tracking-widest mb-2 font-bold">
            Scroll
          </span>
          <ChevronDown size={20} />
        </div>

        <div className="flex space-x-6 text-dark-secondary dark:text-soft-white">
          <Github
            className="hover:text-primary cursor-pointer transition-colors"
            size={24}
          />
          <Linkedin
            className="hover:text-primary cursor-pointer transition-colors"
            size={24}
          />
          <Mail
            className="hover:text-primary cursor-pointer transition-colors"
            size={24}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
