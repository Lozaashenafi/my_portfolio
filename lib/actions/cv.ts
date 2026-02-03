"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase"; // Use the same client we created for projects

export async function getCv() {
  // Get the latest CV from the database
  return await prisma.cv.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

export async function uploadCv(formData: FormData) {
  try {
    const file = formData.get("cvFile") as File;

    if (!file || file.size === 0) {
      throw new Error("No file selected");
    }

    // 1. Generate a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `CV_${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    // 2. Upload the file to the 'portfolio' bucket in Supabase
    // (Ensure you created the 'portfolio' bucket and set it to Public)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      throw new Error("Failed to upload CV to cloud storage");
    }

    // 3. Get the Public URL of the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio").getPublicUrl(filePath);

    // 4. Update Database
    // We delete old records first so you only ever have one active CV link
    await prisma.cv.deleteMany({});

    const newCv = await prisma.cv.create({
      data: {
        filePath: publicUrl, // This is now a full https://... URL
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return newCv;
  } catch (error: any) {
    console.error("CV Upload Error:", error);
    throw new Error(
      error.message || "An unexpected error occurred during upload",
    );
  }
}

export async function deleteCv(id: string, fileUrl: string) {
  try {
    // 1. (Optional) Extract filename from URL to delete from Supabase storage
    // If the URL is https://.../resumes/filename.pdf, we extract 'resumes/filename.pdf'
    const pathSegments = fileUrl.split("/");
    const fileNameInStorage = `resumes/${pathSegments[pathSegments.length - 1]}`;

    await supabase.storage.from("portfolio").remove([fileNameInStorage]);

    // 2. Delete from Prisma Database
    await prisma.cv.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/");
  } catch (err) {
    console.error("Delete Error:", err);
    // Even if storage deletion fails, we want to clear the DB record
    await prisma.cv.delete({ where: { id } }).catch(() => {});
  }
}
