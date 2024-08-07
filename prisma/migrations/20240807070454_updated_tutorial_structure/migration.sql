/*
  Warnings:

  - You are about to drop the column `tutorialsId` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `chapterId` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_tutorialsId_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "tutorialsId",
ADD COLUMN     "chapterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
