"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function getCv() {
  // Usually, a portfolio has one active CV. We'll get the latest one.
  return await prisma.cv.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

export async function uploadCv(formData: FormData) {
  const file = formData.get("cvFile") as File;

  if (!file || file.size === 0) {
    throw new Error("No file selected");
  }

  // 1. Process the file
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `CV_${Date.now()}_${file.name.replaceAll(" ", "_")}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/cv");

  // 2. Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // 3. Write file to public/uploads/cv
  const filePath = `/uploads/cv/${filename}`;
  await fs.writeFile(path.join(process.cwd(), "public", filePath), buffer);

  // 4. Save to Database
  // We'll delete old records so only one CV remains active (optional logic)
  await prisma.cv.deleteMany({});

  const newCv = await prisma.cv.create({
    data: { filePath },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  return newCv;
}

export async function deleteCv(id: string, filePath: string) {
  try {
    // Delete from file system
    const fullPath = path.join(process.cwd(), "public", filePath);
    await fs.unlink(fullPath);
  } catch (err) {
    console.error("File already deleted or not found");
  }

  // Delete from DB
  await prisma.cv.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/");
}
