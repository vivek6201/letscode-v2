import SearchContent from "@/components/Common/SearchContent";
import TutorialView from "@/components/Common/TutorialView";
import MoveBack from "@/components/ui/move-back";
import { getFullTutorialData, getTutorial } from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import prisma from "@/lib/db";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { tutorialsId: string; moduleId: string[] };
  searchParams: any;
}) {
  //add dynamic tutorial view
  //think about rendering a single topic

  const tutorialId = params.tutorialsId;
  const rest = params.moduleId;
  const possiblePath = params.moduleId.join("/");
  const tutorial = await getTutorial(tutorialId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialId));

  const tutorialContent = ContentFinder(
    fullTutorialContent,
    rest.map((id) => Number(id))
  );
  const nextContent = null;

  return (
    <>
      <div className="overflow-y-auto overflow-hidden">
        <TutorialView
          tutorial={tutorial}
          fullTutorialContent={fullTutorialContent}
          rest={rest}
          nextContent={nextContent}
          possiblePath={possiblePath}
          tutorialContent={tutorialContent}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
