import HomeDashboardNavbar from "@/components/HomeDashboard/HomeDashboardNavbar";
import HomeDashboardSidebar from "@/components/HomeDashboard/HomeDashboardSidebar";
import React from "react";

export default function HomeDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeDashboardSidebar>
      <HomeDashboardNavbar />
      {children}
    </HomeDashboardSidebar>
  );
}
