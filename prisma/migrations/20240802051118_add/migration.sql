-- CreateTable
CREATE TABLE "Saved" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,

    CONSTRAINT "Saved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
