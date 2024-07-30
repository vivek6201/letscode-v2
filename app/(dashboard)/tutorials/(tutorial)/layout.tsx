import TutorialChapterSection from "@/components/HomeDashboard/tutorials/TutorialChapterSection";
import React from "react";

export default function TutorialSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TutorialChapterSection />
      {children}
    </>
  );
}
