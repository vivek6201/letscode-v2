"use client";
import { ChildTutorialContent } from "@/db/tutorials";
import type { ContentType, Prisma } from "@prisma/client";
import { Content } from "@prisma/client";
import React from "react";
import MoveBack from "../../ui/move-back";
import TiptapRenderer from "./TiptapRenderer";

export default function ContentRenderer({
  nextContent,
  content,
}: {
  nextContent: {
    id: number;
    type: ContentType;
    title: string;
  } | null;
  content: any;
}) {

  return (
    <div className="border py-10 px-10 rounded-md h-full w-full overflow-y-auto">
      <div className="flex gap-5 items-center">
        <MoveBack />
        <p className="text-2xl font-bold">{content.title}</p>
      </div>

      {/* render tiptap content */}
      <TiptapRenderer content={content.topicMetadata.content}/>
    </div>
  );
}