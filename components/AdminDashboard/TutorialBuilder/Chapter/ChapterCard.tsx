"use client";
import React from "react";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ChapterCard({
  title,
  description,
  topicCount,
  chapterId,
}: {
  title: string;
  description: string;
  topicCount: string;
  chapterId: string;
}) {
  

  return (
    <div className="min-h-[220px] w-full group md:max-w-full rounded-md border hover:ring dark:hover:bg-amber-950/5 ring-amber-800/10 transition-all duration-100 shadow flex flex-col justify-between p-5">
      <div className="flex flex-col gap-y-1">
        <p className="font-semibold text-2xl">{title}</p>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-sm">{topicCount} Topics</p>
        <Button className="flex gap-2">
          Explore{" "}
          <ChevronRight
            className="group-hover:translate-x-1 duration-200 transition-all"
            size={16}
          />
        </Button>
      </div>
    </div>
  );
}
