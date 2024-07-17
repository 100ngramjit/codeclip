/*
  Warnings:

  - Made the column `clerkUserId` on table `Clips` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `Clips` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clips" ALTER COLUMN "clerkUserId" SET NOT NULL,
ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "fileName" DROP NOT NULL,
ALTER COLUMN "lang" DROP NOT NULL;
