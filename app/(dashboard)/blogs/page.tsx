import ItemCard from "@/components/Common/ItemCard";
import { Input } from "@/components/ui/input";
import React from "react";

export default function page() {
  return (
    <div className="flex item-center flex-col pt-10 md:pt-16">
      {/* Render All Tutorial Cards */}
      <Input
        placeholder="Search Topics..."
        className="max-w-[800px] mx-auto w-11/12"
      />

      <div className="">
        <p>Coming soon</p>
      </div>

      <div className="pt-16 px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {/* Grid for all tutorials card listed */}
        {/* <ItemCard title="Array" description="Awesome Content" link="#"/> */}
      </div>
    </div>
  );
}
