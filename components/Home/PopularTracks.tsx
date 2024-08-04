"use client";
import React from "react";
import HighlightedText from "../Common/HighlightedText";

export default function PopularTutorials() {
  return (
    <div className="container mt-20 min-h-[800px]">
      <h2 className="text-4xl font-bold text-center">
        Browse our <HighlightedText text="Latest" /> and{" "}
        <HighlightedText text="Popular" /> Tracks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        
      </div>
    </div>
  );
}