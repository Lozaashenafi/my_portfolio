"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- ADMIN ACTIONS ---

export async function saveBlogPost(formData: FormData, id?: string) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const hashtags = formData.get("hashtags") as string;
  const published = formData.get("published") === "on";
  const frontPage = formData.get("frontPage") === "on";

  // Image Logic
  const file = formData.get("coverImage") as File;
  let imagePath = (formData.get("existingImage") as string) || "";

  if (file && file.size > 0 && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/blog");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/blog/${filename}`;
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  const data = {
    title,
    slug,
    excerpt,
    content,
    hashtags,
    published,
    frontPage,
    coverImage: imagePath,
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}

// --- PUBLIC INTERACTION ACTIONS ---

export async function incrementStars(id: string) {
  await prisma.blogPost.update({
    where: { id },
    data: { stars: { increment: 1 } },
  });
  revalidatePath(`/blog`); // Update list
}

export async function incrementViews(slug: string) {
  await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
