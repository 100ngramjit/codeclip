import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function publishCode(
  title: string,
  body: string,
  clerkUserId: string
) {
  try {
    const clip = await prisma.clips.create({
      data: {
        fileName: title,
        code: body,
        clerkUserId: clerkUserId,
      },
    });
    if (!clip) {
      throw new Error(`User with ID ${clerkUserId} not found.`);
    }

    return clip;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}
