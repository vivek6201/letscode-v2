import ItemCard from "@/components/Common/ItemCard";
import TutorialSearch from "@/components/HomeDashboard/tutorials/TutorialSearch";
import React from "react";

export default function page() {
  return (
    <div className="flex item-center flex-col pt-10 md:pt-16 p-5 md:px-10">
      {/* Render All Tutorial Cards */}
      <div className="flex items-center justify-between ">
        <p className="font-bold text-xl md:text-2xl">All Tutorials</p>
        
        <TutorialSearch/>
      </div>

      <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {/* Grid for all tutorials card listed */}
        <ItemCard title="Array" description="Awesome Content" link="#" />
        <ItemCard title="Array" description="Awesome Content" link="#" />
        <ItemCard title="Array" description="Awesome Content" link="#" />
      </div>
    </div>
  );
}
