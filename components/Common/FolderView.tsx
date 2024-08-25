"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ContentCard from "./ContentCard";
import MoveBack from "../ui/move-back";
import { TutorialType } from "./TutorialView";

export default function FolderView({
  rest,
  tutorialContent,
  tutorialsId,
  tutorial,
  currentContent,
}: {
  currentContent?: { title: string; id: number };
  rest: string[];
  tutorial: TutorialType | null;
  tutorialContent: any;
  tutorialsId: number;
}) {
  // create ui for this component any any logic error persists

  const router = useRouter();

  let updatedRoute = `/tutorials/${tutorialsId}`;

  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  return (
    <div className="flex flex-col gap-y-10 border p-5 rounded-md h-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <MoveBack />
          <div className="flex flex-col gap-y-1">
            <p className="text-2xl font-semibold">{tutorial?.title}</p>
            {currentContent ? <p className="opacity-70">{currentContent.title}</p> : null}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {tutorialContent.map((content: any) => (
          <ContentCard
            description={content.description}
            type={content.type}
            title={content.title}
            image={content.image || ""}
            key={content.id}
            onClick={() => router.push(`${updatedRoute}/${content.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
