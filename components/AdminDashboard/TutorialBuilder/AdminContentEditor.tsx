import { ChildTutorialContent } from "@/db/tutorials";
import React from "react";
import TopicContentForm from "./Forms/TopicContentForm";

export default function AdminContentEditor({
  parentContentId,
  content,
  tutorialId,
}: {
  tutorialId: number;
  parentContentId: number;
  content?: ChildTutorialContent;
}) {
  return (
    <div className="p-5 md:p-10 h-full overflow-y-auto">
      <p className="text-2xl font-semibold mb-10">
        {content ? "Edit Content" : "Add Content"}
      </p>
      {content ? (
        <TopicContentForm
          tutorialId={tutorialId}
          content={content}
          parentContentId={parentContentId}
        />
      ) : (
        <TopicContentForm
          tutorialId={tutorialId}
          parentContentId={parentContentId}
        />
      )}
    </div>
  );
}
