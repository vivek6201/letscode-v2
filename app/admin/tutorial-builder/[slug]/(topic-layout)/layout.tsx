import ChaptersList from "@/components/AdminDashboard/TutorialBuilder/Chapter/ChaptersList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tutorial Builder | Lets Code",
  description: "Here we build tutorials from our main website",
};

export default function TutorialBuilderLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[20rem_1fr]">
      <ChaptersList tutorialSlug={params.slug}/>
      {children}
    </div>
  );
}
