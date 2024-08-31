"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import HeadRoom from "react-headroom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../Common/ModeToogler";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Menu, Shield, User } from "lucide-react";
import { useRecoilState } from "recoil";
import { homeDashSidebarAtom } from "@/store/sidebarStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function HomeDashboardNavbar() {
  const session = useSession();
  const router = useRouter();
  const [homeDashSidebar, setHomeDashSidebar] =
    useRecoilState(homeDashSidebarAtom);

  return (
    <HeadRoom>
      <div className="flex justify-between gap-5 items-center px-5 md:px-10 border-b relative h-16">
        <Menu
          className="lg:hidden cursor-pointer"
          onClick={() => setHomeDashSidebar(!homeDashSidebar)}
        />
        <div className="flex items-center gap-4 absolute right-5 md:right-10">
          <ModeToggle />
          {session.status === "unauthenticated" ? (
            <AuthModal />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarFallback className="select-none">
                    {session.data?.user.name?.split("")[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {session.data?.user.role === "Admin" ? (
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem className="mt-3">
                  <Button className="w-full" onClick={async () => signOut()}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </HeadRoom>
  );
}

function AuthModal() {
  const [isLogin, setIslogin] = useState(true);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"default"}>Login</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="md:w-[500px] min-h-[500px]"
      >
        <div className="flex w-full flex-col items-center justify-around">
          <div className="flex gap-2 flex-col items-center justify-center w-full">
            <p className="text-lg">Welcome to</p>
            <p className="text-3xl">Let's Code</p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="flex w-11/12 items-center gap-2 justify-center mb-5">
            <hr className="flex-1" />
            <span className="text-xs opacity-70">OR</span>
            <hr className="flex-1" />
          </div>

          <div className="flex flex-col gap-y-4 items-center">
            <div className="flex items-center gap-4 gap-y-4 w-10/12 mx-auto ">
              <Button className="dark:bg-neutral-900 w-full flex gap-4 items-center h-10 ">
                <FaGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
              </Button>
              <Button
                className="dark:bg-neutral-900 w-full flex gap-4 items-center h-10"
                type="submit"
              >
                <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Github
                </span>
              </Button>
            </div>
            {isLogin ? (
              <p className="text-center opacity-70">
                New to Lets's Code?{"  "}
                <span
                  onClick={() => setIslogin(false)}
                  className="text-red-400 font-medium cursor-pointer"
                >
                  Create an Account
                </span>
              </p>
            ) : (
              <p className="text-center opacity-70">
                Already have an account?{"  "}
                <span
                  onClick={() => setIslogin(true)}
                  className="cursor-pointer text-red-400 font-medium"
                >
                  Login to account
                </span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
