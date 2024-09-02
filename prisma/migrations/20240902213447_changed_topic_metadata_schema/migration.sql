-- DropForeignKey
ALTER TABLE "TopicMetadata" DROP CONSTRAINT "TopicMetadata_contentId_fkey";

-- AddForeignKey
ALTER TABLE "TopicMetadata" ADD CONSTRAINT "TopicMetadata_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
