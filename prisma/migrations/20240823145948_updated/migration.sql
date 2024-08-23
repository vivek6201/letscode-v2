-- DropForeignKey
ALTER TABLE "TutorialContent" DROP CONSTRAINT "TutorialContent_contentId_fkey";

-- AddForeignKey
ALTER TABLE "TutorialContent" ADD CONSTRAINT "TutorialContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
