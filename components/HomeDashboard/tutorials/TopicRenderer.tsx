"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomTooltip from "@/components/ui/custom-tooltip";

export default function TopicRenderer() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <CustomTooltip
            trigger={
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => router.back()}
              >
                <ArrowLeft />
              </Button>
            }
            text="Go Back"
          />

          <p className="font-bold text-3xl">Introduction</p>
        </div>
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
