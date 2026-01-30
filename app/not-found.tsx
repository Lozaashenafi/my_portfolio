"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <section className="bg-light dark:bg-dark-primary min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] "></div>

      <div className="relative z-10 text-center">
        {/* The Big 404 Number */}
        <div className="relative inline-block">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none text-slate-900 dark:text-soft-white opacity-10 dark:opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-soft-white uppercase tracking-tighter">
              Lost in <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #b91c1c" }}
              >
                Space
              </span>
            </h2>
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-primary font-mono font-bold uppercase tracking-widest mb-4">
            <AlertTriangle size={18} />
            <span>Error: Page Not Found</span>
          </div>

          <p className="text-dark-secondary dark:text-gray-400 text-lg mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto bg-primary hover:bg-secondary text-soft-white px-8 py-4 font-bold rounded-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Home size={18} />
              BACK TO HOME
            </button>

            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto border-2 border-dark-secondary dark:border-soft-white text-dark-primary dark:text-soft-white px-8 py-4 font-bold hover:bg-dark-secondary dark:hover:bg-soft-white hover:text-soft-white dark:hover:text-dark-primary transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
