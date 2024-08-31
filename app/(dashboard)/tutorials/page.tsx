import ItemCard from "@/components/Common/ItemCard";
import AllTutorialsClient from "@/components/HomeDashboard/tutorials/AllTutorialsClient";
import TutorialSearch from "@/components/HomeDashboard/tutorials/TutorialSearch";
import React from "react";

export default async function page() {
  return (
    <div className="flex item-center flex-col pt-10 md:pt-16 p-5 md:px-10">
      {/* Render All Tutorial Cards */}
      <div className="flex items-center justify-between ">
        <p className="font-bold text-xl md:text-2xl">All Tutorials</p>
        <TutorialSearch />
      </div>

      <AllTutorialsClient />
    </div>
  );
}
