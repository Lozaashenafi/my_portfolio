"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markAsRead(id: string, isRead: boolean) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead },
  });
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });
  revalidatePath("/admin");
}
