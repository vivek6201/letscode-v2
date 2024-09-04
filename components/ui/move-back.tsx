"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import CustomTooltip from "./custom-tooltip";

export default function MoveBack() {
  const router = useRouter();

  return (
    <CustomTooltip
      text="Go Back"
      trigger={
        <Button variant={"outline"} size={"icon"} onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
      }
    />
  );
}
