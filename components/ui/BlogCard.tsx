import React from "react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

// 1. Define the BlogPost interface here
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean; // Optional property
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div
      className={`h-full bg-slate-50 dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary p-8 rounded-sm flex flex-col group hover:border-primary transition-all`}
    >
      {/* Post Metadata */}
      <div className="flex items-center gap-6 mb-6 text-xs font-mono text-slate-500 dark:text-gray-400">
        {post.featured && (
          <span className="bg-primary text-soft-white px-2 py-1 font-bold rounded-xs uppercase tracking-tighter">
            Featured
          </span>
        )}
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          {post.date}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          {post.readTime}
        </div>
      </div>

      {/* Title & Excerpt */}
      <h3
        className={`font-black text-slate-900 dark:text-soft-white group-hover:text-primary transition-colors mb-4 leading-tight ${
          post.featured ? "text-3xl md:text-4xl" : "text-xl"
        }`}
      >
        {post.title}
      </h3>
      <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8 grow">
        {post.excerpt}
      </p>

      {/* Footer: Tags & Action */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-dark-tertiary">
        <div className="flex gap-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all flex items-center gap-1 font-mono text-xs font-bold">
          READ MORE <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
