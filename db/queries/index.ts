import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function publishClip(
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
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        code: true,
        fileName: true,
        lang: true,
        userEmail: true,
        saved: {
          select: {
            id: true,
          },
          where: {
            clerkUserId: clerkUserId,
          },
          take: 1,
        },
      },
    });

    if (clips.length === 0) {
      console.log(`No clips found for user with ID ${clerkUserId}.`);
      return [];
    }

    return clips.map((clip) => ({
      ...clip,
      isSaved: clip.saved.length > 0,
    }));
  } catch (error) {
    console.error("Error fetching user clips:", error);
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
      include: {
        saved: true,
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
      include: {
        saved: true,
      },
    });

    return clips;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}

export async function editClip(
  clipId: string,
  clerkUserId: string,
  title?: string,
  body?: string
) {
  try {
    const existingClip = await prisma.clips.findUnique({
      where: { id: clipId },
    });

    if (!existingClip) {
      throw new Error(`Clip with ID ${clipId} not found.`);
    }

    if (existingClip.clerkUserId !== clerkUserId) {
      throw new Error("User is not authorized to edit this clip.");
    }

    const updatedClip = await prisma.clips.update({
      where: { id: clipId },
      data: {
        fileName: title || existingClip.fileName,
        code: body || existingClip.code,
      },
    });

    return updatedClip;
  } catch (error) {
    console.error("Error editing clip:", error);
    throw error;
  }
}

export async function deleteClip(clipId: string) {
  try {
    const clip = await prisma.clips.delete({
      where: {
        id: clipId,
      },
    });
    if (!clip) {
      throw new Error(`Clip with ID ${clipId} not found.`);
    }

    return clip;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}

export async function saveClip(clipId: string, clerkUserId: string) {
  try {
    const clip = await prisma.saved.create({
      data: {
        clerkUserId: clerkUserId,
        clipId: clipId,
      },
    });
    if (!clip) {
      throw new Error(`Clip with ID ${clipId} not found.`);
    }

    return clip;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}

export async function getSavedClips(clerkUserId: string) {
  try {
    const savedClips = await prisma.saved.findMany({
      where: {
        clerkUserId: clerkUserId,
      },
      include: {
        clip: true,
      },
    });

    if (savedClips.length === 0) {
      console.log(`No saved clips found for user with ID ${clerkUserId}.`);
      return [];
    }

    return savedClips;
  } catch (error) {
    console.error("Error fetching saved clips:", error);
    throw error;
  }
}

export async function deleteSavedClip(id: string, clerkUserId: string) {
  try {
    const clip = await prisma.saved.delete({
      where: {
        clerkUserId: clerkUserId,
        id: id,
      },
    });
    if (!clip) {
      throw new Error(`Clip with ID ${id} not found.`);
    }

    return clip;
  } catch (error) {
    console.error("Error posting clip:", error);
    throw error;
  }
}
