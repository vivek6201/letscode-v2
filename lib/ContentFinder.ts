import { ChildTutorialContent, FullTutorialContent } from "@/db/tutorials";
import { ContentType } from "@prisma/client";

export const ContentFinder = (
  contents: FullTutorialContent[],
  ids: number[]
):
  | { type: ContentType; contents: ChildTutorialContent[] }
  | { type: ContentType; contents: ChildTutorialContent }
  | null => {


  if (ids.length === 0) return { type: ContentType.Content, contents };

  const currentId = ids[0];
  const remainingIds = ids.slice(1);

  const currentContent = contents.find((content) => content.id === currentId);

  if (!currentContent) return null;
  else if (remainingIds.length === 0) {
    if (currentContent.type === ContentType.Folder)
      return {
        type: ContentType.Folder,
        contents: currentContent.children ?? [],
      };
    else return { type: ContentType.Content, contents: currentContent };
  }

  return ContentFinder(currentContent?.children || [], remainingIds);
};
