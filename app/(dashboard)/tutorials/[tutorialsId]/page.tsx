import SearchContent from "@/components/Common/SearchContent";
import TutorialView from "@/components/Common/TutorialView";
import { Button } from "@/components/ui/button";
import MoveBack from "@/components/ui/move-back";
import { getFullTutorialData, getTutorial } from "@/db/tutorials";
import { ContentFinder } from "@/lib/ContentFinder";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { tutorialsId: string };
  searchParams: string;
}) {
  const tutorialsId = params.tutorialsId;
  const rest: string[] = [];
  const tutorial = await getTutorial(tutorialsId);
  const fullTutorialContent = await getFullTutorialData(Number(tutorialsId));
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
