"use server";

import prisma from "../prisma";

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Please fill in all fields.");
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
      subject: `Portfolio Inquiry from ${name}`, // Default subject
    },
  });

  return { success: true };
}
