"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
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
import { adminDashSidebarAtom } from "@/store/sidebarStore";

export default function AdminNavbar() {
  const session = useSession();
  const router = useRouter();
  const [adminSidebar, setAdminSidebar] = useRecoilState(adminDashSidebarAtom);

  return (
    <HeadRoom>
      <div className="flex justify-between gap-5 items-center px-10 border-b relative h-16">
        <Menu
          className="lg:hidden cursor-pointer"
          onClick={() => setAdminSidebar(!adminSidebar)}
        />
        <div className="flex items-center gap-4 absolute right-10">
          <ModeToggle />
          {session.status === "unauthenticated" ? (
            <Button onClick={() => signIn()} variant={"default"}>
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
      </div>
    </HeadRoom>
  );
}
