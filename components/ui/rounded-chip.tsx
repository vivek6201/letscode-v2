"use client";
import React from "react";

export default function RoundedChip({ text }: { text: string }) {
  return (
    <p className="shadow rounded-full px-5 py-2 border text-center hover:shadow-md hover:cursor-pointer transition-all duration-200 hover:bg-red-200 hover:dark:bg-neutral-900">
      {text}
    </p>
  );
}
