import AuthComponent from "@/components/auth/authComponent";
import React from "react";

export default function page() {
  return (
    <div className="min-h-[800px] flex items-center justify-center">
      <AuthComponent page={"login"}/>
    </div>
  );
}
