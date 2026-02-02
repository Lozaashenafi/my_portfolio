// app/(site)/blog/[slug]/page.tsx
import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import BlogDetailPage from "../../../components/home/BlogDetailPage";
import { incrementViews } from "../../../lib/actions/blog";
export const dynamic = "force-dynamic"; // <--- ADD THIS AT THE VERY TOP

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch current post
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });

  if (!post) notFound();

  // 2. Fetch other posts (excluding current)
  const otherPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      NOT: { id: post.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // 3. Track view
  incrementViews(slug);

  return <BlogDetailPage post={post} otherPosts={otherPosts} />;
}
