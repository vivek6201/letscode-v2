/*
  Warnings:

  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Folder', 'Content');

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_tutorialsId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_chapterId_fkey";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "TutorialContent" (
    "tutorialsId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "TutorialContent_pkey" PRIMARY KEY ("tutorialsId","contentId")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'Folder',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,
    "topicMetadataId" INTEGER,
    "sortingOrder" INTEGER NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicMetadata" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,

    CONSTRAINT "TopicMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TopicMetadata_contentId_key" ON "TopicMetadata"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "TopicMetadata_slug_key" ON "TopicMetadata"("slug");

-- AddForeignKey
ALTER TABLE "TutorialContent" ADD CONSTRAINT "TutorialContent_tutorialsId_fkey" FOREIGN KEY ("tutorialsId") REFERENCES "Tutorials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorialContent" ADD CONSTRAINT "TutorialContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicMetadata" ADD CONSTRAINT "TopicMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
