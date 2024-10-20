"use client";
import React from "react";
import HighlightedText from "../Common/HighlightedText";
import { ArrowRight, Github, MoveRight, Search } from "lucide-react";
import { Button } from "../ui/button";
import CustomIcon from "../ui/custom-icon";
import Link from "next/link";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-y-10 container mt-10 md:mt-20">
        <Link href={"http://github.com/vivek6201/letscode-v2"}>
          <Button
            variant={"secondary"}
            className="px-5 md:px-8 h-10 rounded-full flex items-center gap-2 md:gap-4 transition-all duration-200 hover:border text-xs md:text-sm"
          >
            <CustomIcon iconName={Github} /> Contribute to codebase{" "}
            <CustomIcon iconName={ArrowRight} />
          </Button>
        </Link>

        <h2 className="text-4xl lg:text-5xl font-bold max-w-[500px] text-center">
          <HighlightedText text="Learn" />, Code and Grow{" "}
          <HighlightedText text={"Together"} />
        </h2>

        <p className="max-w-[800px] text-center opacity-80">
          A Technical Content Platform for Students, Teachers and Working
          professional to gain new Technical skills through blogs, tailored in
          depth tutorials.
        </p>

        {/* Will be replaced with react select in future */}
        <div className="rounded-full flex w-full max-w-[800px] bg-gray-100 dark:bg-transparent border border-gray-500 dark:border-neutral-800">
          <input
            className="border-none rounded-l-full text-sm outline-none flex-grow px-5 bg-transparent py-3"
            placeholder="Search for topic"
          />

          <button className="rounded-r-full  px-5 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300">
            <Search className="text-white" />
          </button>
        </div>
      </div>

      <ContainerScroll>
        <Image
          src={`/assets/homepage.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-fill h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
