import AuthComponent from "@/components/auth/authComponent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (session?.user) redirect("/");
  return (
    <div className="h-screen flex items-center justify-center">
      <AuthComponent page={"Signup"} />
    </div>
  );
}
