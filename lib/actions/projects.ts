"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase"; // Import the client we just made

export async function getAllSkills() {
  return await prisma.skill.findMany({ orderBy: { name: "asc" } });
}

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      skills: { include: { skill: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveProject(formData: FormData, id?: string) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const featured = formData.get("featured") === "on";
    const highlighted = formData.get("highlighted") === "on";
    const published = formData.get("published") === "on";
    const selectedSkillIds = formData.getAll("skills") as string[];

    // --- CLOUD IMAGE UPLOAD LOGIC ---
    const file = formData.get("coverImage") as File;
    let coverImagePath = (formData.get("existingImageUrl") as string) || "";

    // Check if a new file was uploaded (type check ensures it's a file, not a string)
    if (file && file.size > 0 && typeof file !== "string") {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      // 1. Upload the file to the 'portfolio' bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Supabase Upload Error:", uploadError);
        throw new Error("Failed to upload image to cloud storage");
      }

      // 2. Get the Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      coverImagePath = publicUrl;
    }
    // ---------------------------------

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    const projectData = {
      title,
      slug,
      description,
      githubUrl,
      liveUrl,
      coverImage: coverImagePath,
      featured,
      highlighted,
      published,
    };

    if (id) {
      await prisma.project.update({
        where: { id },
        data: {
          ...projectData,
          skills: {
            deleteMany: {},
            create: selectedSkillIds.map((skillId) => ({
              skill: { connect: { id: skillId } },
            })),
          },
        },
      });
    } else {
      await prisma.project.create({
        data: {
          ...projectData,
          skills: {
            create: selectedSkillIds.map((skillId) => ({
              skill: { connect: { id: skillId } },
            })),
          },
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Project Save Error:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export async function deleteProject(id: string) {
  // Optional: You could also delete the image from Supabase Storage here
  await prisma.skillsOnProjects.deleteMany({ where: { projectId: id } });
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
