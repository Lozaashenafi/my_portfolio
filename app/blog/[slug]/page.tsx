// app/(site)/blog/[slug]/page.tsx
import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import BlogDetailPage from "../../../components/home/BlogDetailPage";
// Remove incrementViews import if it's not used elsewhere

export const dynamic = "force-dynamic";

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

  return <BlogDetailPage post={post} otherPosts={otherPosts} />;
}
