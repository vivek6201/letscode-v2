"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { signIn } from "next-auth/react";

export default function AuthComponent({ page }: { page: string }) {
  const router = useRouter();

  const handleOAuth = async (provider: string) => {
    const res = await signIn(provider);
    console.log({ res });
  };

  return (
    <Card className="w-11/12 max-w-[550px] min-h-[500px] py-10">
      <CardContent className="flex flex-col items-center justify-around h-full w-full">
        <div className="flex gap-2 flex-col items-center justify-center w-full">
          <p className="text-lg">Welcome to</p>
          <p className="text-3xl">Let&apos;s Code</p>
        </div>

        {page === "Login" ? <LoginForm /> : <SignupForm />}

        <div className="flex w-10/12 items-center gap-2 justify-center mb-10">
          <Separator className="flex-1" />
          <span className="text-xs opacity-70">OR</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-y-4 items-center">
          <div className="flex items-center gap-4 gap-y-4 w-10/12 mx-auto ">
            <Button
              className="dark:bg-neutral-900 w-full flex gap-4 items-center h-10 "
              onClick={async () => await handleOAuth("google")}
            >
              <FaGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
            </Button>
            <Button
              className="dark:bg-neutral-900 w-full flex gap-4 items-center h-10"
              onClick={async () => await handleOAuth("github")}
            >
              <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Github
              </span>
            </Button>
          </div>
          {page === "Login" ? (
            <p className="text-center opacity-70">
              New to Lets&apos;s Code?{"  "}
              <span
                onClick={() => router.push("/signup")}
                className="text-red-400 font-medium cursor-pointer"
              >
                Create an Account
              </span>
            </p>
          ) : (
            <p className="text-center opacity-70">
              Already have an account?{"  "}
              <span
                onClick={() => router.push("/login")}
                className="cursor-pointer text-red-400 font-medium"
              >
                Login to account
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
