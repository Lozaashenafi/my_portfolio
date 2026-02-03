// components/home/BlogSection.tsx
import React from "react";
import BlogCard from "../ui/BlogCard";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";
import Link from "next/link";
// We don't need "use client" here!

const BlogSection = async () => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true, frontPage: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="bg-white dark:bg-dark-primary py-20 px-6 md:px-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <MiniHeader title="Blog & Insights" number={4} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map through posts to get automatic indexing for the stagger effect */}
          {posts.map((post, idx) => {
            // Logic for the layout: First one is big, rest are small
            const isFeatured = idx === 0;
            const gridClass = isFeatured ? "lg:col-span-8" : "lg:col-span-4";

            return (
              <div key={post.id} className={gridClass}>
                <BlogCard
                  post={post as any}
                  isFeatured={isFeatured}
                  index={idx}
                />
              </div>
            );
          })}

          {/* View All CTA - Let's use a standard CSS transition here to keep it simple */}
          <div className="lg:col-span-4 flex items-center justify-center p-8">
            <Link
              href="/blog"
              className="group flex flex-col items-center gap-4 text-primary font-bold uppercase tracking-[0.3em] text-sm"
            >
              <span className="group-hover:tracking-[0.5em] transition-all duration-300">
                View All Articles
              </span>
              <div className="h-[2px] w-12 bg-primary group-hover:w-24 transition-all duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
