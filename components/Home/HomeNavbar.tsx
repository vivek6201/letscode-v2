"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, Bug, Menu, Shield, User } from "lucide-react";
import Headroom from "react-headroom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../Common/ModeToogler";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import HighlightedText from "../Common/HighlightedText";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <Headroom>
      <div className="border-b shadow">
        <div
          className={`px-5 md:px-10 py-4 flex justify-between items-center backdrop-blur-md container`}
        >
          <Link href={"/"} className="font-bold text-2xl">
            Lets
            <HighlightedText text="Code" />
          </Link>
          <div className="md:flex items-center gap-4 hidden">
            <ModeToggle />
            {session.status === "unauthenticated" ? (
              <Button
                onClick={() => signIn()}
                variant={"default"}
                className=" text-white px-8"
              >
                Login
              </Button>
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

          {/* modify the code written below later as sheet is looking ugly in mobile screens */}
          <div className="flex gap-2 md:hidden">
            <ModeToggle />
            {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="max-w-[50%] h-screen grid grid-rows-[10%_1fr]">
              <SheetHeader>
                <SheetTitle className="text-left text-xl mb-10">
                  Lets Code
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-between h-full">
                <div className="grid grid-cols-1 gap-y-3">
                  <Button
                    variant={"ghost"}
                    className="gap-4 flex justify-start"
                    onClick={() => router.push("/profile")}
                  >
                    <User size={20} /> Profile
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="gap-4 flex justify-start"
                    onClick={() => router.push("/blogs")}
                  >
                    <Book size={20} /> Blogs
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="gap-4 flex justify-start"
                    onClick={() => router.push("/tutorials")}
                  >
                    <Book size={20} /> Tutorials
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-y-4">
                  {!session.data ? (
                    <Button onClick={async () => await signIn()}>Login</Button>
                  ) : null}

                  {session.data?.user.role === "Admin" ? (
                    <Button
                      variant={"outline"}
                      className="flex justify-between items-center"
                      onClick={() => router.push("/admin")}
                    >
                      Admin Panel <User />
                    </Button>
                  ) : null}

                  <Button
                    variant={"destructive"}
                    className="flex justify-between items-center gap-2"
                  >
                    Report Bug <Bug size={20} />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet> */}
          </div>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
