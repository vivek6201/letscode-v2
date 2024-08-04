"use client";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { Plus } from "lucide-react";
import React from "react";
import AddChapterDialog from "./AddChapterDialog";

export default function ChaptersList() {
  return (
    <div className="border-r p-5">
      <div className="flex justify-between items-center">
        <p className="font-semibold select-none">Chapters</p>
        <AddChapterDialog
          trigger={
            <Button variant={"ghost"} size={"icon"}>
              <CustomIcon iconName={Plus} />
            </Button>
          }
        />
      </div>
      
      {/* list all chapters here */}
      <div></div>
    </div>
  );
}
