/*
  Warnings:

  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_first_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_url" TEXT NOT NULL;
