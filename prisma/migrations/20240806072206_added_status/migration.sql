/*
  Warnings:

  - Added the required column `sortingOrder` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortingOrder` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Draft', 'Published');

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "sortingOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "sortingOrder" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Draft';

-- AlterTable
ALTER TABLE "Tutorials" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Draft';
