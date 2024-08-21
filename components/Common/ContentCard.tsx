"use client";
import { ContentType } from "@prisma/client";
import React from "react";

export default function ContentCard({
  type,
  title,
  image,
  onClick,
}: {
  type: ContentType;
  title: string;
  image: string;
  onClick: () => void;
}) {
  return <div onClick={onClick}>
    ContentCard
  </div>;
}
