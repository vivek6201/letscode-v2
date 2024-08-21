import TutorialView from "@/components/Common/TutorialView";
import prisma from "@/lib/db";
import React from "react";

const getData = async (slug: string) => {
  const data = await prisma.tutorials.findUnique({
    where: {
      slug: slug,
    },
  });

  return data;
};

export default async function page({ params }: { params: { slug: string[] } }) {
  const data = await getData(params.slug[0]);

  console.log(data);

  //add dynamic tutorial view
  //think about rendering a single topic

  return (
    <>
      <div className="p-10 overflow-y-auto"> 
        {/* correct this */}
        {/* <TutorialView /> */}
      </div>
    </>
  );
}
