import AllTutorialsClient from "@/components/HomeDashboard/tutorials/AllTutorialsClient";
import TutorialSearch from "@/components/HomeDashboard/tutorials/TutorialSearch";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import React from "react";

const getData = async () => {
  const session = await auth();

  if (session?.user) {
    let tutorials;
    if (session.user.role === "User") {
      tutorials = await prisma.tutorials.findMany({
        where: {
          status: "Published",
        },
      });
    } else {
      tutorials = await prisma.tutorials.findMany({});
    }

    return tutorials ? tutorials : null;
  }

  const tutorials = await prisma.tutorials.findMany({
    where: {
      status: "Published",
    },
  });

  return tutorials ? tutorials : null;
};

export default async function page() {
  const data = await getData();

  return (
    <div className="flex item-center flex-col pt-10 md:pt-16 p-5 md:px-10">
      {/* Render All Tutorial Cards */}
      <div className="flex items-center justify-between ">
        <p className="font-bold text-xl md:text-2xl">All Tutorials</p>
        <TutorialSearch />
      </div>

      <AllTutorialsClient tutorials={data} />
    </div>
  );
}
