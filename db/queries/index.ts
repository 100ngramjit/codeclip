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

export async function userClips(clerkUserId: string) {
  try {
    const clips = await prisma.clips.findMany({
      where: {
        clerkUserId: clerkUserId,
      },
    });
    if (!clips) {
      throw new Error(`User with ID ${clerkUserId} not found.`);
    }

    return clips;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}
