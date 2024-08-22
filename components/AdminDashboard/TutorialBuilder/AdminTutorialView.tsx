'use client'
import ContentCard from "@/components/Common/ContentCard";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminTutorialView({
  rest,
  tutorialContent,
  tutorialId
}: {
  rest: string[];
  tutorialId: number
  tutorialContent: { title: string; image: string; id: number }[];
}) {

  const router = useRouter();
  let updatedRoute = `/admin/tutorial-builder/${tutorialId}`;
  
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  return (
    <div>
      Tutorial content
      <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
        {tutorialContent?.map(
          (content: { image: string; id: number; title: string }) => (
            <ContentCard
              type="Folder"
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
              key={content.id}
            />
          ),
        ) ?? []}
      </div>
    </div>
  )
}
