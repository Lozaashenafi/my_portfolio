import React, { Suspense } from "react";
import prisma from "../../lib/prisma";
import BlogCard from "../../components/ui/BlogCard";
import Search from "../../components/ui/Search";

export const dynamic = "force-dynamic";

// In Next.js 15, searchParams is a Promise
type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function BlogListPage({ searchParams }: Props) {
  // IMPORTANT: You must await searchParams in Next.js 15
  const filters = await searchParams;
  const query = filters.query || "";

  // 1. Fetch filtered articles
  const allPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      // The search logic
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-300 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-dark-tertiary dark:text-light font-mono text-sm uppercase tracking-widest mt-4">
              A collection of thoughts and technical insights.
              <span className="block mt-1 text-primary">
                {query
                  ? `Found ${allPosts.length} matches for "${query}"`
                  : `Total Entries: ${allPosts.length}`}
              </span>
            </p>
          </div>

          {/* 🔍 The Search Component wrapped in Suspense */}
          <Suspense
            fallback={
              <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-lg" />
            }
          >
            <Search />
          </Suspense>
        </div>

        {/* 2. The Grid */}
        {allPosts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-slate-200 dark:border-dark-tertiary rounded-xl">
            <p className="font-mono text-gray-500 uppercase">
              {query
                ? `No results found for "${query}"`
                : "No articles published yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => (
              <div key={post.id} className="h-full">
                {/* Cast as any if your Prisma types and Component types have slight mismatches */}
                <BlogCard post={post as any} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
