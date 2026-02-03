// components/home/BlogDetailPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import AppreciateButton from "../ui/AppreciateButton";
import BlogCard from "../ui/BlogCard"; // Reusing the card for the bottom section
import { toast } from "sonner";

const BlogDetailPage = ({
  post,
  otherPosts,
}: {
  post: any;
  otherPosts: any[];
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const tags =
    post.hashtags?.split(" ").filter((t: string) => t.startsWith("#")) || [];

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight)
        setScrollProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-300">
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/10 z-[60]">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-dark-tertiary hover:text-primary transition-colors group font-mono text-sm uppercase"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK_TO_FEED
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link Copied!");
            }}
            className="p-3 rounded-full bg-slate-100 dark:bg-dark-primary hover:bg-primary/10 transition-colors group"
          >
            <Share2
              size={18}
              className="dark:text-slate-300 group-hover:text-primary"
            />
          </button>
        </div>

        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 border border-primary/20 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-dark-primary dark:text-soft-white leading-tight uppercase">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-dark-tertiary dark:text-soft-white font-mono text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-primary" />{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" /> {post.readMin}
            </div>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-primary" /> {post.views} VIEWS
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative aspect-video mb-16 overflow-hidden rounded-sm border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}

        <section className="max-w-none">
          <div
            className="prose prose-lg prose-slate dark:prose-invert 
      max-w-none
      /* These classes below ensure H1, H2, and Lists are visible and spaced */
      prose-headings:font-black prose-headings:uppercase 
      prose-h1:text-3xl prose-h2:text-2xl
      prose-p:leading-relaxed prose-p:mb-4
      prose-ul:list-disc prose-ul:ml-6
      prose-ol:list-decimal prose-ol:ml-6
      prose-a:text-primary 
      text-dark-tertiary dark:text-soft-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-8">
          <AppreciateButton id={post.id} initialStars={post.stars} />
          <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
            LOG_REF: {post.id} // UPDATED{" "}
            {new Date(post.updatedAt).toDateString()}
          </div>
        </footer>
      </article>

      {/* NEW: More Articles Section */}
      {otherPosts.length > 0 && (
        <section className="bg-left dark:bg-dark-secondary py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 dark:text-soft-white mb-10 uppercase tracking-tighter">
              Continue Reading_
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;
