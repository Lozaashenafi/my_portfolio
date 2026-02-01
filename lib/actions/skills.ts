"use server";

import { SkillCategory } from "@prisma/client";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { name: "asc" },
  });
}

export async function saveSkill(formData: FormData, id?: string) {
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  const level = parseInt(formData.get("level") as string) || 0;
  // Get the category from form
  const category = formData.get("category") as SkillCategory;

  if (id) {
    await prisma.skill.update({
      where: { id },
      data: { name, icon, level, category },
    });
  } else {
    await prisma.skill.create({
      data: { name, icon, level, category },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: { id },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
