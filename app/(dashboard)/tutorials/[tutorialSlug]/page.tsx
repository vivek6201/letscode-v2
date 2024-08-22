import TutorialView from "@/components/Common/TutorialView";
import { getFullTutorialData, getTutorial } from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import React from "react";
import { string } from "zod";

export default async function page({
  params,
  searchParams,
}: {
  params: { tutorialId: string };
  searchParams: string;
}) {
  const tutorialId = params.tutorialId;
  const rest: string[] = [];
  const tutorial = await getTutorial(tutorialId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialId));
  const tutorialContent = ContentFinder(
    fullTutorialContent,
    rest.map((x) => parseInt(x))
  );
  const nextContent = null;

  return (
    <div>
      <TutorialView
        rest={[]}
        tutorial={tutorial}
        tutorialContent={tutorialContent}
        nextContent={nextContent}
        fullTutorialContent={fullTutorialContent}
        searchParams={searchParams}
        possiblePath=""
      />
    </div>
  );
}
