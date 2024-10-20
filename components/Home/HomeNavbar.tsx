"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import HighlightedText from "../Common/HighlightedText";
import { navList } from "@/constants/SidebarList";
import CustomIcon from "../ui/custom-icon";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <Headroom>
      <div className="bg-transparent">
        <div
          className={`px-5 md:px-10 py-4 flex justify-between items-center container`}
        >
          <Link href={"/"} className="font-bold text-2xl">
            Lets
            <HighlightedText text="Code" />
          </Link>

          <div className="md:flex gap-5 items-center justify-center hidden">
            {navList.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <p className="capitalize hover:underline">{item.name}</p>
                </Link>
              );
            })}
          </div>

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
                    <AvatarImage
                      src={session.data?.user?.image ?? ""}
                      alt="profile-pic"
                    />
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
          <div className="flex gap-2 items-center md:hidden">
            <ModeToggle />

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <CustomIcon iconName={Menu} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="">
                <DrawerHeader>
                  <DrawerTitle>LetsCode</DrawerTitle>
                  <DrawerDescription>Choose One</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-y-4 items-center my-10 text-lg">
                  <Link href={"/tutorials"}>Tutorials</Link>
                  <Link href={"/contact"}>Contact us</Link>

                  {session.status === "authenticated" ? (
                    <Link href={"/profile"} className="text-red-500 font-medium">Profile</Link>
                  ) : (
                    <Link href={"/login"} className="text-red-500 font-medium">
                      Login
                    </Link>
                  )}

                  {
                    session.data?.user.role === "Admin" ? <Link href={"/admin"} className="font-medium">Admin Panel</Link> : null
                  }
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline" className="w-10/12 h-10">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
