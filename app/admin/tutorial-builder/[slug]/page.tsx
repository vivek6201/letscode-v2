"use client";
import React, { useRef } from "react";
import AddChapterDialog from "@/components/AdminDashboard/TutorialBuilder/Chapter/AddChapterDialog";
import ChapterCard from "@/components/AdminDashboard/TutorialBuilder/Chapter/ChapterCard";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { urls } from "@/constants/urls";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `${urls.chapters}?tutorialSlug=${params.slug}`,
    fetcher
  );

  return (
    <div className="md:p-10 p-5 flex flex-col ">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <CustomIcon iconName={ArrowLeft} />
          </Button>
          <p className="font-bold text-2xl">Chapters</p>
        </div>
        <AddChapterDialog
          trigger={
            <Button className="flex gap-2 items-center">
              Add New <CustomIcon iconName={Plus} />
            </Button>
          }
          tutorialSlug={params.slug}
        />
      </div>
      {
        //display real data after creating data
        error ? (
          <div></div>
        ) : isLoading ? (
          <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from([1, 2, 3]).map((item, index) => (
              <Skeleton className="min-h-[220px] w-full" key={index} />
            ))}
          </div>
        ) : data.chapters.length <= 0 ? (
          <div className="pt-16 flex min-h-[200px] justify-center items-center flex-1">
            <p>No chapters Found</p>
          </div>
        ) : (
          <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
            {/* Grid for all tutorials card listed */}
            {data.chapters.map(
              (
                it: {
                  chapterName: string;
                  id: string;
                  tutorialsId: string;
                  _count: { topics: string };
                },
                i: number
              ) => (
                <ChapterCard
                  title={it.chapterName}
                  description=""
                  topicCount={it._count.topics}
                  chapterId={it.id}
                  key={i}
                />
              )
            )}
          </div>
        )
      }
    </div>
  );
}
