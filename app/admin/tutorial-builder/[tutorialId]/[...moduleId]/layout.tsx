import ContentSidebar from "@/components/AdminDashboard/TutorialBuilder/ContentSidebar";
import prisma from "@/lib/db";
import React from "react";

export default async function TutorialBuilderLayout({
  params: { moduleId },
  children,
}: {
  params: { moduleId: string[] };
  children: React.ReactNode;
}) {

  return (
    <div className="grid grid-cols-[350px_1fr]">
      <ContentSidebar />
      {children}
    </div>
  );
}
