"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm";

export default function AuthComponent({ page }: { page: string }) {
  return (
    <div className="rounded-lg border p-10 w-10/12 max-w-[500px] bg-gray-100 dark:bg-transparent flex flex-col items-center gap-y-5 justify-center">
      <p className="max-w-[80%] font-semibold text-2xl text-center">
        Welcome Back to <br />
        <span className="font-extrabold text-4xl text-red-500 font-kanit">
          Let'sCode
        </span>
      </p>

      {
        page === "login" ? <LoginForm/> : <SignupForm/>
      }

      <div className="flex gap-5 items-center">
        <Button variant={"ghost"} size={"icon"}>
          <FaGoogle />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}
