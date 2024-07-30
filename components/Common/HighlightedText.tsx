"use client";
import React from "react";

export default function HighlightedText({ text }: { text: string }) {
  return (
    <span className="bg-gradient-to-r from-blue-500 via-green-500 to-blue-300 bg-clip-text text-transparent">
      {text}
    </span>
  );
}