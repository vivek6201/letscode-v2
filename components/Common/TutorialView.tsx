import React from "react";
import TopicRenderer from "../HomeDashboard/tutorials/TopicRenderer";
import { $Enums, ContentType } from "@prisma/client";
import type { ChildTutorialContent, FullTutorialContent } from "@/db/tutorials";
import ContentRenderer from "./ContentRenderer";
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

export default function TutorialView({
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
  return (
    <div className="p-10 overflow-y-auto">
      {tutorialContent?.type === "Content" ? (
        <ContentRenderer nextContent={nextContent} content={{...tutorialContent}} />
      ) : null}

      {tutorialContent?.type === "Folder" ? (
        <FolderView
          rest={rest}
          tutorialContent={tutorialContent.contents}
          tutorialId={tutorial?.id ?? 0}
        />
      ) : null}
    </div>
  );
}
