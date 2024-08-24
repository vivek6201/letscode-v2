import AddTutorialFolder from "@/components/AdminDashboard/TutorialBuilder/AddTutorialFolder";
import AdminContentEditor from "@/components/AdminDashboard/TutorialBuilder/AdminContentEditor";
import AdminTutorialView from "@/components/AdminDashboard/TutorialBuilder/AdminTutorialView";
import {
  ChildTutorialContent,
  getCurrentContent,
  getFullTutorialData,
  getTutorial,
} from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import React from "react";

export default async function page({
  params,
}: {
  params: { moduleId: string[]; tutorialId: string };
}) {
  const tutorialId = params.tutorialId;
  const rest = params.moduleId;

  const tutorial = await getTutorial(tutorialId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialId));

  const tutorialContent = ContentFinder(
    fullTutorialContent,
    rest.map((x) => Number(x))
  );

  if (rest[rest.length - 1] === "new-topic") {
    //this creates a new content
    //remember to pass the parentId as rest[rest.length - 2]
    return (
      <AdminContentEditor
        tutorialId={Number(tutorialId)}
        parentContentId={Number(rest[rest.length - 2])}
      />
    );
  }

  //this is used to fetch the contents of current child
  const currentContent = await getCurrentContent(Number(rest[rest.length - 1]));

  if (tutorialContent?.type === "Content") {
    // this edits the existing content
    return (
      <AdminContentEditor
        tutorialId={Number(tutorialId)}
        parentContentId={Number(rest[rest.length - 1])}
        content={tutorialContent.contents as ChildTutorialContent}
      />
    );
  }

  return (
    <div className="p-10">
      <AddTutorialFolder
        rest={rest}
        tutorial={tutorial}
        tutorialId={Number(tutorialId)}
        parentContentId={parseFloat(rest[rest.length - 1])}
        currentContent={{
          title: currentContent?.title || "",
          id: currentContent?.id ?? 0,
        }}
      />
      <AdminTutorialView
        rest={rest}
        tutorialContent={
          (tutorialContent?.contents as ChildTutorialContent[])?.map((x) => ({
            title: x?.title ?? "",
            image: x?.thumbnail ?? "",
            id: x?.id || 0,
            description: x?.description ?? "",
          })) || []
        }
        tutorialId={Number(tutorialId)}
      />
    </div>
  );
}
