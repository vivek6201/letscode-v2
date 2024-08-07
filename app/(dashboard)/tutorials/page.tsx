import ItemCard from "@/components/Common/ItemCard";
import TutorialSearch from "@/components/HomeDashboard/tutorials/TutorialSearch";
import prisma from "@/lib/db";
import React from "react";

const fetchTutorials = async () => {
  try {
    const tutorials = await prisma.tutorials.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        _count: true,
      },
    });

    return { tutorials }; // Return an object with 'tutorials' property
  } catch (error) {
    console.error("error", error);
    return { tutorials: [] }; // Return an object with empty 'tutorials' property
  }
};

export default async function page() {
  const { tutorials } = await fetchTutorials();

  return (
    <div className="flex item-center flex-col pt-10 md:pt-16 p-5 md:px-10">
      {/* Render All Tutorial Cards */}
      <div className="flex items-center justify-between ">
        <p className="font-bold text-xl md:text-2xl">All Tutorials</p>

        <TutorialSearch tutorials={tutorials}/>
      </div>

      <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {/* Grid for all tutorials card listed */}
        {tutorials.map((it) => {
          return (
            <ItemCard
              title={it.title}
              description={it.description}
              link={`/tutorials/${it.slug}`}
              key={it.id}
              count={it._count.chapter}
            />
          );
        })}
      </div>
    </div>
  );
}
