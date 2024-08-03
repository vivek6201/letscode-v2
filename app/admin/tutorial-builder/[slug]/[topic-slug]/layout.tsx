import ChaptersList from "@/components/AdminDashboard/TutorialBuilder/ChaptersList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tutorial Builder | Lets Code",
  description: "Here we build tutorials from our main website",
};

export default function TutorialBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <ChaptersList />
      {children}
    </div>
  );
}
