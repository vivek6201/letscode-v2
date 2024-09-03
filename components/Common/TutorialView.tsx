import React from "react";
import { $Enums, ContentType } from "@prisma/client";
import {
  getCurrentContent,
  type ChildTutorialContent,
  type FullTutorialContent,
} from "@/db/tutorials";
import ContentRenderer from "../HomeDashboard/tutorials/ContentRenderer";
import FolderView from "./FolderView";

export type TutorialType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  status: $Enums.Status;
  createdAt: Date;
  updatedAt: Date;
};

export type TutorialContent =
  | {
      type: ContentType;
      contents: ChildTutorialContent[];
    }
  | {
      type: ContentType;
      contents: ChildTutorialContent;
    }
  | null;

export default async function TutorialView({
  tutorial,
  tutorialContent,
  nextContent,
  rest,
  fullTutorialContent,
  searchParams,
  possiblePath,
}: {
  rest: string[];
  tutorial: TutorialType | null;
  tutorialContent: TutorialContent;
  nextContent: any;
  fullTutorialContent: FullTutorialContent[];
  searchParams: any;
  possiblePath: string;
}) {
  const currentContent = await getCurrentContent(Number(rest[rest.length - 1]));

  return (
    <div className="h-full">
      {tutorialContent?.type === "Content" ? (
        <ContentRenderer
          nextContent={nextContent}
          content={tutorialContent.contents}
        />
      ) : null}

      {tutorialContent?.type === "Folder" ? (
        <FolderView
          currentContent={{
            title: currentContent?.title ?? "",
            id: currentContent?.id ?? -1,
          }}
          tutorial={tutorial}
          rest={rest}
          tutorialContent={tutorialContent.contents}
          tutorialsId={tutorial?.id ?? 0}
        />
      ) : null}
    </div>
  );
}
