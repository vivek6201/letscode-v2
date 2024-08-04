import ItemCard from "@/components/Common/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";

export default function page() {
  return (
    <div className="flex item-center flex-col pt-10 md:pt-16 p-5 md:px-10">
      {/* Render All Tutorial Cards */}
      <div className="flex items-center justify-between ">
        <p className="font-bold text-xl md:text-2xl">All Tutorials</p>
        <Button
          variant="outline"
          className="md:pr-2"
          // onClick={() => setDialogOpen(true)}
        >
          <div className="md:hidden flex items-center justify-center">
            <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="md:flex gap-2 items-center hidden">
            <p>Search Tutorials...</p>

            <kbd className="bg-white/15 p-1.5 rounded-sm text-xs leading-3 md:ml-5">
              Ctrl K
            </kbd>
          </div>
        </Button>
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
