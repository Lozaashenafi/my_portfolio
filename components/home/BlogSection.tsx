// components/home/BlogSection.tsx
import React from "react";
import BlogCard from "../ui/BlogCard";
import MiniHeader from "../ui/MiniHeader";
import prisma from "../../lib/prisma";
import Link from "next/link";

const BlogSection = async () => {
  // Fetch posts marked for front page
  const posts = await prisma.blogPost.findMany({
    where: { published: true, frontPage: true },
    orderBy: { createdAt: "desc" },
    take: 4, // Matches your grid layout (1 featured + 3 others)
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
          {/* Featured Post - First post in array */}
          {posts[0] && (
            <div className="lg:col-span-8">
              <BlogCard post={posts[0] as any} isFeatured />
            </div>
          )}

          {/* Side Post - Second post */}
          {posts[1] && (
            <div className="lg:col-span-4">
              <BlogCard post={posts[1] as any} />
            </div>
          )}

          {/* Bottom Row - Third post */}
          {posts[2] && (
            <div className="lg:col-span-4">
              <BlogCard post={posts[2] as any} />
            </div>
          )}

          {/* Bottom Row - Fourth post */}
          {posts[3] && (
            <div className="lg:col-span-4">
              <BlogCard post={posts[3] as any} />
            </div>
          )}

          {/* View All CTA */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              View All Articles
              <div className="h-[2px] w-8 bg-primary"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
