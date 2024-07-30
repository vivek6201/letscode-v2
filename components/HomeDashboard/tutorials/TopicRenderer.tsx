"use client";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export default function TopicRenderer() {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center justify-between">
        <p className="font-bold text-3xl">Introduction</p>
        <div className="flex gap-5 items-center">
          <Button variant={"secondary"} className="flex gap-2 items-center">
            <CustomIcon iconName={ArrowLeft} /> Prev
          </Button>
          <Button variant={"secondary"} className="flex gap-2 items-center">
            Next <CustomIcon iconName={ArrowRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}
