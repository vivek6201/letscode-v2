"use client";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddChapterDialog from "./AddChapterDialog";
import useSWR from "swr";
import { urls } from "@/constants/urls";
import { fetcher } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ChaptersList({
  tutorialSlug,
}: {
  tutorialSlug: string;
}) {
  const { data, error, isLoading } = useSWR(
    `${urls.chapters}?tutorialSlug=${tutorialSlug}`,
    fetcher
  );

  return (
    <div className="border-r p-5">
      <div className="flex justify-between items-center">
        <p className="font-semibold select-none">Chapters</p>
        <AddChapterDialog
          trigger={
            <Button variant={"ghost"} size={"icon"}>
              <CustomIcon iconName={Plus} />
            </Button>
          }
          tutorialSlug={tutorialSlug}
        />
      </div>

      {/* list all chapters here */}
      {error ? (
        <div>Error</div>
      ) : isLoading ? (
        <div className="h-full flex flex-col gap-1 items-center justify-center">
          <LoaderCircle className="animate-spin"/>
          <p className="text-xs">Loading...</p>
        </div>
      ) : (
        <div className="mt-5">
          {data.chapters.map((item:any) => {
            return (
              <Accordion type="single" collapsible className="w-full" key={item.id}>
                <AccordionItem value={item.id}>
                  <AccordionTrigger>{item.chapterName}</AccordionTrigger>
                  <AccordionContent>
                    
                    <Button variant={"outline"} className="w-full">Add Topic </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
    </div>
  );
}
