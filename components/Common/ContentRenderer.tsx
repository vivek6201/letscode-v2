"use client";
import type { ContentType } from "@prisma/client";
import { Content } from "@prisma/client";
import React from "react";

export default function ContentRenderer({
  nextContent,
  content,
}: {
  nextContent: {
    id: number;
    type: ContentType;
    title: string;
  } | null;
  content: any;
}) {
  console.log(content);


  //add create ui for this component and check any logic errors persists
  return <div></div>;
}
