import TutorialView from "@/components/Common/TutorialView";
import { getFullTutorialData, getTutorial } from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import React from "react";

export default async function page({
  params,
  searchParams
}: {
  params: { tutorialId: string };
  searchParams: any
}) {
  const tutorialId = params.tutorialId;
  const tutorial = await getTutorial(tutorialId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialId));
  const tutorialContent = ContentFinder(fullTutorialContent, []);
  const nextContent = null;

  return (
    <TutorialView
      rest = {[]}
      tutorial={tutorial}
      tutorialContent={tutorialContent}
      nextContent={nextContent}
      fullTutorialContent={fullTutorialContent}
      searchParams={searchParams}
      possiblePath=""
     />
  );
}
