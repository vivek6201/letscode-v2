import AdminNavbar from "@/components/AdminDashboard/AdminNavbar";
import AdminSidebar from "@/components/AdminDashboard/AdminSidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "Admin") redirect("/");

  return (
    <AdminSidebar>
      <AdminNavbar />
      {children}
    </AdminSidebar>
  );
}
