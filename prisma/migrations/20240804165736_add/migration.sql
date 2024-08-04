-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_clipId_fkey";

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
