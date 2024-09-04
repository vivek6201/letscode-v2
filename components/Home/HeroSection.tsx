"use client";
import React from "react";
import HighlightedText from "../Common/HighlightedText";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Github, MoveRight, Search } from "lucide-react";
import RoundedChip from "../ui/rounded-chip";
import { Button } from "../ui/button";
import CustomIcon from "../ui/custom-icon";
import Link from "next/link";

export default function HeroSection() {
  const carousalItems = ["HTML", "CSS", "JavaScript", "Python", "C++", "Java"];

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center gap-y-10 container">
      <Link href={"http://github.com/vivek6201/letscode-v2"}>
        <Button
          variant={"secondary"}
          className="px-8 h-10 rounded-full flex gap-4 transition-all duration-200 hover:border"
        >
          <CustomIcon iconName={Github} /> Contribute to codebase{" "}
          <CustomIcon iconName={ArrowRight} />
        </Button>
      </Link>

      <h2 className="text-4xl lg:text-5xl font-bold max-w-[500px] text-center">
        <HighlightedText text="Learn" />, Code and Grow{" "}
        <HighlightedText text={"Together"} />
      </h2>

      <p className="max-w-[800px] text-center opacity-70">
        A Technical Content Platform for Students, Teachers and Working
        professional to gain new Technical skills through blogs, tailored in
        depth tutorials.
      </p>

      {/* Will be replaced with react select in future */}
      <div className="rounded-full flex w-full max-w-[800px] bg-gray-100 dark:bg-transparent border">
        <input
          className="border-none rounded-l-full text-sm outline-none flex-grow px-5 bg-transparent py-3"
          placeholder="Search for topic"
        />

        <button className="rounded-r-full  px-5 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300">
          <Search className="text-white" />
        </button>
      </div>

      {/* <div className="mt-10 flex flex-col gap-y-5 items-center">
        <p className="opacity-80">Popular Topics</p>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent
            className="-ml-2 md:-ml-4 items-center"
            draggable={true}
          >
            {carousalItems.map((item, index) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                <RoundedChip text={item} key={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </div>
  );
}
