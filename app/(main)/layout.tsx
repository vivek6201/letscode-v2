import HomeNavbar from "@/components/Home/HomeNavbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomeNavbar />
      {children}
    </div>
  );
}
