import React from "react";
import prisma from "../../lib/prisma";
import MiniHeader from "../../components/ui/MiniHeader";
import BlogCard from "../../components/ui/BlogCard";
export const dynamic = "force-dynamic"; // <--- ADD THIS AT THE VERY TOP

export default async function BlogListPage() {
  // 1. Fetch all published articles
  const allPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-300 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <p className="text-slate-500 dark:text-gray-400 font-mono text-sm uppercase tracking-widest mt-4">
            A collection of thoughts, tutorials, and technical insights.
            <span className="block mt-1 text-primary">
              Total Entries: {allPosts.length}
            </span>
          </p>
        </div>

        {/* 2. The Grid */}
        {allPosts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-slate-200 dark:border-dark-tertiary">
            <p className="font-mono text-gray-500 uppercase">
              No articles published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <div key={post.id} className="h-full">
                {/* Reusing your BlogCard component for consistency */}
                <BlogCard post={post as any} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
