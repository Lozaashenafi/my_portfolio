"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function getExperiences() {
  return await prisma.experience.findMany({
    include: { skills: { include: { skill: true } } },
    orderBy: { startDate: "desc" },
  });
}

export async function saveExperience(formData: FormData, id?: string) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const companyWebsite = formData.get("companyWebsite") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const current = formData.get("current") === "on";
  const endDate = current ? null : new Date(formData.get("endDate") as string);

  // Handling the description array (bullet points)
  const description = formData.getAll("description") as string[];
  const selectedSkillIds = formData.getAll("skills") as string[];

  // Logo Upload Logic
  const file = formData.get("companyLogo") as File;
  let logoPath = (formData.get("existingLogo") as string) || "";

  if (file && file.size > 0 && typeof file !== "string") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    logoPath = `/uploads/${filename}`;
  }

  const data: any = {
    company,
    role,
    location,
    description,
    startDate,
    endDate,
    current,
    companyWebsite,
    companyLogo: logoPath,
  };

  if (id) {
    await prisma.experience.update({
      where: { id },
      data: {
        ...data,
        skills: {
          deleteMany: {},
          create: selectedSkillIds.map((sid) => ({
            skill: { connect: { id: sid } },
          })),
        },
      },
    });
  } else {
    await prisma.experience.create({
      data: {
        ...data,
        skills: {
          create: selectedSkillIds.map((sid) => ({
            skill: { connect: { id: sid } },
          })),
        },
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin");
}
