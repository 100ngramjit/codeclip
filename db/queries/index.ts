import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function publishCode(
  title: string,
  body: string,
  clerkUserId: string,
  userEmail: string
) {
  try {
    const clip = await prisma.clips.create({
      data: {
        fileName: title,
        code: body,
        clerkUserId: clerkUserId,
        userEmail: userEmail,
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

export async function ramdomClips(clerkUserId: string) {
  try {
    const clips = await prisma.$queryRaw`
  SELECT * FROM "Clips"
  ORDER BY RANDOM()
  LIMIT 10
`;
    if (!clips) {
      throw new Error(`User with ID ${clerkUserId} not found.`);
    }

    return clips;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}

export async function searchClips(
  searchTerm: string,
  limit: number = 10,
  offset: number = 0
) {
  try {
    const clips = await prisma.clips.findMany({
      where: {
        OR: [
          { fileName: { contains: searchTerm, mode: "insensitive" } },
          { code: { contains: searchTerm, mode: "insensitive" } },
          { userEmail: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (clips.length === 0) {
      console.log(`No clips found matching the search term: ${searchTerm}`);
    }

    return clips;
  } catch (error) {
    console.error("Error searching clips:", error);
    throw error;
  }
}

export async function clipDetails(id: string) {
  try {
    const clips = await prisma.clips.findFirst({
      where: {
        id: id,
      },
    });

    return clips;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}
