"use client";
import { ChildTutorialContent } from "@/db/tutorials";
import type { ContentType, Prisma } from "@prisma/client";
import { Content } from "@prisma/client";
import React from "react";
import MoveBack from "../../ui/move-back";
import TiptapRenderer from "./TiptapRenderer";
import { useRecoilState } from "recoil";
import { tutorialSidebarAtom } from "@/store/sidebarStore";
import { Button } from "@/components/ui/button";

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
  const [tutorialSidebar, setTutorialSidebar] =
    useRecoilState(tutorialSidebarAtom);

  return (
    <div className="p-8 w-full">
      <div className="flex items-center justify-between">
        <MoveBack />
        {!tutorialSidebar ? (
          <Button
            variant={"outline"}
            onClick={() => setTutorialSidebar(!tutorialSidebar)}
          >
            Show Contents
          </Button>
        ) : null}
      </div>

      <div>
        <p className="text-3xl font-bold mt-8 mb-12 text-red-400">{content.title}</p>
      </div>

      {/* render tiptap content */}
      <TiptapRenderer content={content.topicMetadata.content} />
    </div>
  );
}
