import TopicRenderer from "@/components/HomeDashboard/tutorials/TopicRenderer";
import TutorialChapterSection from "@/components/HomeDashboard/tutorials/TutorialChapterSection";
import prisma from "@/lib/db";
import React from "react";

const getData = async (slug: string) => {
  const chapter = await prisma.tutorials.findUnique({
    where: {
      slug: slug,
    },
    include: {
      chapter: {
        orderBy: {
          sortingOrder: "asc",
        },
        include: {
          topics: {
            //TODO: add status check also later down the line
            orderBy: {
              sortingOrder: "asc",
            },
          },
        },
      },
    },
  });

  if (!chapter) {
    return { chapter: [] };
  }

  return chapter;
};

export default async function page({ params }: { params: { slug: string[] } }) {
  const { chapter } = await getData(params.slug[0]);

  //think about rendering a single topic

  return (
    <>
      <TutorialChapterSection chapters={chapter} /> 
      <div className="p-10 overflow-y-auto">
        {/* Render Topic here*/}
        <TopicRenderer />
      </div>
    </>
  );
}
