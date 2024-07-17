/*
  Warnings:

  - Made the column `fileName` on table `Clips` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clips" ALTER COLUMN "fileName" SET NOT NULL;
