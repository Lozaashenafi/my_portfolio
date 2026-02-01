"use server";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

// 1. Fetch Skills to show in the checkbox list
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
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const featured = formData.get("featured") === "on";
  const highlighted = formData.get("highlighted") === "on";
  const published = formData.get("published") === "on";
  const selectedSkillIds = formData.getAll("skills") as string[];

  // Image Upload Logic
  const file = formData.get("coverImage") as File;
  let coverImagePath = (formData.get("existingImageUrl") as string) || "";

  if (file && file.size > 0 && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    coverImagePath = `/uploads/${filename}`;
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  const projectData: any = {
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
}
export async function deleteProject(id: string) {
  await prisma.skillsOnProjects.deleteMany({ where: { projectId: id } }); // Cleanup join table
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
}
