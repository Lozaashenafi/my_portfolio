"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase"; // Ensure this matches your Supabase client path

export async function getExperiences() {
  return await prisma.experience.findMany({
    include: { skills: { include: { skill: true } } },
    orderBy: { startDate: "desc" },
  });
}

export async function saveExperience(formData: FormData, id?: string) {
  try {
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const location = formData.get("location") as string;
    const companyWebsite = formData.get("companyWebsite") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const current = formData.get("current") === "on";
    const endDate = current
      ? null
      : new Date(formData.get("endDate") as string);

    // Handling the description array (bullet points from multiple inputs)
    const description = formData.getAll("description") as string[];
    const selectedSkillIds = formData.getAll("skills") as string[];

    // --- CLOUD LOGO UPLOAD LOGIC ---
    const file = formData.get("companyLogo") as File;
    let logoPath = (formData.get("existingLogo") as string) || "";

    if (file && file.size > 0 && typeof file !== "string") {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `experience-logos/${fileName}`;

      // Upload to Supabase 'portfolio' bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Supabase Upload Error:", uploadError);
        throw new Error("Failed to upload company logo");
      }

      // Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      logoPath = publicUrl;
    }
    // ---------------------------------

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
    return { success: true };
  } catch (error: any) {
    console.error("Experience Save Error:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export async function deleteExperience(id: string) {
  // Logic to delete the record
  await prisma.skillsOnExperiences.deleteMany({ where: { experienceId: id } });
  await prisma.experience.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/");
}
