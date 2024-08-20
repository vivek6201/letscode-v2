"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";

export default function TopicNavbar({ edit = false }: { edit?: boolean }) {
  return (
    <div className="shadow-md flex h-20 items-center justify-between px-10">
      {edit ? (
        <p className="text-xl font-bold">Edit Topic</p>
      ) : (
        <p className="text-xl font-bold ">Add Topic</p>
      )}
    </div>
  );
}
