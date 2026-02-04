"use client";
import React from "react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: Date;
  readMin: string;
  hashtags: string | null;
  frontPage?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured, index = 0 }) => {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tags = post.hashtags?.split(" ").filter((t) => t.trim() !== "") || [];

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <motion.div
        // 1. Animation Logic
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        // 2. Interaction Logic
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }} // Haptic-like feedback for mobile
        className="h-full bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-8 rounded-sm flex flex-col group hover:border-primary transition-colors cursor-pointer relative shadow-sm hover:shadow-xl"
      >
        {/* Post Metadata */}
        <div className="flex items-center gap-6 mb-6 text-xs font-mono text-slate-500 dark:text-gray-400">
          {(post.frontPage || isFeatured) && (
            <span className="bg-primary text-soft-white px-2 py-1 font-bold rounded-xs uppercase tracking-tighter">
              Featured
            </span>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary" />
            {post.readMin || "5 min read"}
          </div>
        </div>

        {/* Title: Removed nested Link to avoid <a> inside <a> error */}
        <h3
          className={`font-black text-dark-secondary dark:text-soft-white group-hover:text-primary transition-colors mb-4 leading-tight uppercase ${
            isFeatured ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>

        <p className="text-dark-tertiary dark:text-light leading-relaxed mb-8 grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-dark-tertiary">
          <div className="flex flex-wrap gap-x-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 
            Read More: 
            - Visible on mobile (opacity-100)
            - Animated on desktop (md: group-hover)
          */}
          <div
            className="text-primary flex items-center gap-1 font-mono text-xs font-bold whitespace-nowrap transition-all duration-300
              md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0"
          >
            READ MORE <ArrowUpRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
