"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import RoundedChip from "@/components/ui/rounded-chip";

export default function TutorialChapterSection({
  chapters,
}: {
  chapters: {
    id: number;
    chapterName: string;
    sortingOrder: number;
    tutorialsId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) {

  //on clicking any chapter this should open a command box where user will be searching which topic he/she wants to read!
  //also make this reaponsive as well

  return (
    <div className="px-5 py-2 border-b">
      <Carousel className="mx-10">
        <CarouselContent className="-ml-1">
          {chapters.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-1 md:basis-1/4 lg:basis-1/6"
            >
              <div className="p-1">
                <RoundedChip text={item.chapterName} key={item.id} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
