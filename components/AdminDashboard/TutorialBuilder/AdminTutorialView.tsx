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
  tutorialContent: { title: string; image: string; id: number, description: string }[];
}) {

  const router = useRouter();
  let updatedRoute = `/admin/tutorial-builder/${tutorialId}`;
  
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {tutorialContent?.map(
          (content) => (
            <ContentCard
              type="Folder"
              title={content.title}
              description={content.description ?? ""}
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
