"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase"; // Import the client

export async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function saveBlogPost(formData: FormData, id?: string) {
  try {
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const hashtags = formData.get("hashtags") as string;
    const readMin = formData.get("readMin") as string;
    const published = formData.get("published") === "on";
    const frontPage = formData.get("frontPage") === "on";

    // --- CLOUD IMAGE UPLOAD LOGIC ---
    const file = formData.get("coverImage") as File;
    let imagePath = (formData.get("existingImage") as string) || "";

    // Check if a new file was uploaded
    if (file && file.size > 0 && typeof file !== "string") {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // 1. Upload to Supabase bucket 'portfolio'
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Supabase Blog Upload Error:", uploadError);
        throw new Error("Failed to upload blog image to cloud storage");
      }

      // 2. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      imagePath = publicUrl;
    }
    // ---------------------------------

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
      readMin,
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

    return { success: true };
  } catch (error: any) {
    console.error("Blog Save Error:", error);
    throw new Error(
      error.message || "An unexpected error occurred saving the post",
    );
  }
}

export async function deleteBlogPost(id: string) {
  // Logic to delete the record
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function incrementStars(id: string) {
  await prisma.blogPost.update({
    where: { id },
    data: { stars: { increment: 1 } },
  });
  revalidatePath(`/blog`);
}

export async function incrementViews(slug: string) {
  await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}
