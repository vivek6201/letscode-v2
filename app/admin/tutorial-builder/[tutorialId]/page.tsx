import AddTutorialFolder from "@/components/AdminDashboard/TutorialBuilder/AddTutorialFolder";
import AdminTutorialView from "@/components/AdminDashboard/TutorialBuilder/AdminTutorialView";
import {
  ChildTutorialContent,
  getFullTutorialData,
  getTutorial,
} from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { tutorialId: string };
  searchParams: any;
}) {
  const tutorialId = params.tutorialId;
  const rest: string[] = [];
  const tutorial = await getTutorial(tutorialId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialId));
  const tutorialContent = ContentFinder(
    fullTutorialContent,
    rest.map((x) => parseInt(x))
  );

  return (
    <div className="p-10">
      <AddTutorialFolder
        rest={rest}
        tutorial={tutorial}
        tutorialId={Number(tutorialId)}
        parentContentId={parseFloat(rest[rest.length - 1])}
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
