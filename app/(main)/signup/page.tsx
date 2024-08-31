import AuthComponent from "@/components/auth/authComponent";
import React from "react";

export default function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <AuthComponent page={"Signup"} />
    </div>
  );
}
