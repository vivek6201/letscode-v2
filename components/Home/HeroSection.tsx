"use client";
import React from "react";
import HighlightedText from "../Common/HighlightedText";
import { Book, MoveRight } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div className="flex flex-col py-24 container items-center">
      <p className="capitalize font-bold text-5xl text-center">
        Level up your technical <HighlightedText text="Knowledge" /> with Us
      </p>
      <p className="text-gray-500 pt-3">
        Explore our Courses, tutorials, technical Blogs, Master Every Concept
        with Easy Explaination.
      </p>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 mt-10">
        <HomeCard
          title="Tutorials"
          description="Learn fast and efficiently"
          link="/tutorials"
          icon={<Book />}
        />
        <HomeCard
          title="Tutorials"
          description="Learn fast and efficiently"
          link="/tutorials"
          icon={<Book />}
        />
        <HomeCard
          title="Tutorials"
          description="Learn fast and efficiently"
          link="/tutorials"
          icon={<Book />}
        />
      </div>
    </div>
  );
}

const HomeCard = ({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) => {
  return (
    <div className="dark:bg-[#ffffff0d] border dark:border-[#3D3D3D] dark:backdrop-blur-lg rounded-[20px] p-4 md:p-6 flex items-start flex-col max-w-[328px] shadow-[0px_0px_2px_0px_#00000040] group dark:hover:border-[#FCEDEF] hover:border-red-600">
      {icon}
      <p>{title}</p>
      <p>{description}</p>
      <Button variant={"outline"}>
        Try <MoveRight />
      </Button>
    </div>
  );
};
