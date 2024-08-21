"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ContentCard from "./ContentCard";

export default function FolderView({
  rest,
  tutorialContent,
  tutorialId,
}: {
  rest: string[];
  tutorialContent: any;
  tutorialId: number;
}) {
  // create ui for this component any any logic error persists
  
  const router = useRouter();

  let updatedRoute = `/admin/tutorial-builder/${tutorialId}`;

  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  return (
    <div>
      {tutorialContent.map((content: any) => (
        <ContentCard
          type={content.type}
          title={content.title}
          image={content.image || ""}
          key={content.id}
          onClick={() => router.push(`${updatedRoute}/${content.id}`)}
        />
      ))}
    </div>
  );
}
