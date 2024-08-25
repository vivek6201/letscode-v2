import TutorialPageLayout from "@/components/HomeDashboard/tutorials/TutorialPageLayout";
import { getFullTutorialData, getTutorial } from "@/db/tutorials";
import React from "react";

export default async function layout({
  params,
  children,
}: {
  params: { tutorialsId: string };
  children: React.ReactNode;
}) {
  const tutorialsId = params.tutorialsId;
  const tutorialContent = await getFullTutorialData(Number(tutorialsId));

  return (
    <TutorialPageLayout
      tutorialsId={Number(tutorialsId)}
      tutorialContent={tutorialContent}
    >
      {children}
    </TutorialPageLayout>
  );
}
