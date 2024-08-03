import AdminNavbar from "@/components/AdminDashboard/AdminNavbar";
import AdminSidebar from "@/components/AdminDashboard/AdminSidebar";
import React from "react";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSidebar>
      <AdminNavbar />
      {children}
    </AdminSidebar>
  );
}
