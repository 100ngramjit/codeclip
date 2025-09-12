import { mapLanguage } from "@/lib/langDetector";
import { PrismaClient } from "@prisma/client";
import flourite from "flourite";

const prisma = new PrismaClient();

export async function publishClip(
  title: string,
  body: string,
  clerkUserId: string,
  userEmail: string
) {
  try {
    const detectedLanguage = flourite(body);

    const clip = await prisma.clips.create({
      data: {
        fileName: title,
        code: body,
        clerkUserId: clerkUserId,
        userEmail: userEmail,
        lang: mapLanguage(detectedLanguage.language),
      },
    });

    if (!clip) {
      throw new Error(`Failed to create clip for user with ID ${clerkUserId}.`);
    }

    const { clerkUserId: _clerkUserId, ...filteredClip } = clip;
    return filteredClip;
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
    });

    if (clips.length === 0) {
      console.log(`No clips found for user with ID ${clerkUserId}.`);
      return [];
    }

    return clips.map(({ clerkUserId: _clerkUserId, ...clip }) => clip);
  } catch (error) {
    console.error("Error fetching user clips:", error);
    throw error;
  }
}

export async function randomClips(clerkUserId: string) {
  try {
    const clips = await prisma.$queryRaw`
      SELECT * FROM "Clips"
      WHERE "clerkUserId" != ${clerkUserId}
      ORDER BY RANDOM()
      LIMIT 10
    `;

    if (!clips) {
      console.log("No clips found.");
      return [];
    }

    return (clips as any[]).map(
      ({ clerkUserId: _clerkUserId, ...clip }) => clip
    );
  } catch (error) {
    console.error("Error fetching random clips:", error);
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

    return clips.map(({ clerkUserId: _clerkUserId, ...clip }) => clip);
  } catch (error) {
    console.error("Error searching clips:", error);
    throw error;
  }
}

export async function clipDetails(id: string, clerkUserId: string) {
  try {
    const clip = await prisma.clips.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        clerkUserId: true,
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

    if (!clip) {
      console.log(`Clip with ID ${id} not found.`);
      return null;
    }

    // const { clerkUserId: _clerkUserId, ...filteredClip } = clip;
    return {
      ...clip,
      isSaved: clip.saved.length > 0,
    };
  } catch (error) {
    console.error("Error fetching clip details:", error);
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

    const { clerkUserId: _clerkUserId, ...filteredClip } = updatedClip;
    return filteredClip;
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

    const { clerkUserId: _clerkUserId, ...filteredClip } = clip;
    return filteredClip;
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
      orderBy: {
        createdAt: "desc",
      },
    });

    if (savedClips.length === 0) {
      console.log(`No saved clips found for user with ID ${clerkUserId}.`);
      return [];
    }

    const clipData = savedClips.map((savedClip) => {
      const { clerkUserId: _clerkUserId, ...clip } = savedClip.clip;
      return clip;
    });
    return clipData;
  } catch (error) {
    console.error("Error fetching saved clips:", error);
    throw error;
  }
}

export async function deleteSavedClip(clipId: string, clerkUserId: string) {
  try {
    const clip = await prisma.saved.deleteMany({
      where: {
        clerkUserId: clerkUserId,
        clipId: clipId,
      },
    });

    if (clip.count === 0) {
      throw new Error(
        `Saved clip with clipId ${clipId} not found for user ${clerkUserId}.`
      );
    }

    return clip;
  } catch (error) {
    console.error("Error deleting saved clip:", error);
    throw error;
  }
}
