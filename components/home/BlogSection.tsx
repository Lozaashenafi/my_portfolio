import React from "react";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import BlogCard from "../ui/BlogCard";
import MiniHeader from "../ui/MiniHeader";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const BlogSection: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt:
        "Learn the patterns and practices for building maintainable React apps that scale with your team.",
      date: "Jan 15, 2026",
      readTime: "8 min read",
      tags: ["React", "Architecture"],
      featured: true,
    },
    {
      id: 2,
      title: "The Art of Clean Code",
      excerpt:
        "Why clean code matters and how to write code that your future self will thank you for.",
      date: "Jan 10, 2026",
      readTime: "6 min read",
      tags: ["Best Practices", "Code Quality"],
    },
    {
      id: 3,
      title: "TypeScript Tips for Better DX",
      excerpt:
        "Advanced TypeScript techniques to improve your developer experience and catch bugs early.",
      date: "Jan 5, 2026",
      readTime: "10 min read",
      tags: ["TypeScript", "Tips"],
    },
    {
      id: 4,
      title: "CSS Architecture at Scale",
      excerpt:
        "Strategies for organizing CSS in large applications using modern approaches.",
      date: "Dec 28, 2025",
      readTime: "7 min read",
      tags: ["CSS", "Architecture"],
    },
  ];

  return (
    <section
      id="blog"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Blog & Insights" number={4} />

        {/* Blog Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Post - Spans 8 columns on large screens */}
          <div className="lg:col-span-8">
            <BlogCard post={posts[0]} />
          </div>

          {/* Side Post - Spans 4 columns */}
          <div className="lg:col-span-4">
            <BlogCard post={posts[1]} />
          </div>

          {/* Bottom Row Posts - Each spans 4 columns */}
          <div className="lg:col-span-4">
            <BlogCard post={posts[2]} />
          </div>
          <div className="lg:col-span-4">
            <BlogCard post={posts[3]} />
          </div>

          {/* View All CTA */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <a
              href="/blog"
              className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              View All Articles
              <div className="h-[2px] w-8 bg-primary"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
