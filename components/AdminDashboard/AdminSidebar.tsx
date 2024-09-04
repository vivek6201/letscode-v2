"use client";
import React from "react";
import Image from "next/image";
import SidebarItem from "../Common/SidebarItem";
import { adminSidebarList } from "@/constants/SidebarList";
import { ArrowLeftFromLine, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRecoilState } from "recoil";
import { adminDashSidebarAtom } from "@/store/sidebarStore";
import Link from "next/link";

export interface ItemListType {
  name: string;
  link: string;
  icon: React.ReactElement;
}

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adminSidebar, setAdminSidebar] = useRecoilState(adminDashSidebarAtom);

  return (
    <div className="flex">
      <div
        className={`border-r z-20 h-screen transition-transform duration-500 ease-in-out lg:flex lg:relative lg:translate-x-0 absolute flex ${
          adminSidebar ? "translate-x-0" : "-translate-x-full"
        } flex-col w-[18rem] py-5 px-3 justify-between backdrop-blur-md`}
      >
        <div>
          <div className="flex items-center justify-between lg:justify-center px-5">
            <Link href={"/"}>
              <Image
                src={"/assets/logo.png"}
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full w-16 aspect-square"
              />
            </Link>

            <Button
              variant={"outline"}
              size={"icon"}
              className="lg:hidden"
              onClick={() => setAdminSidebar(!adminSidebar)}
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col gap-y-2 mt-16">
            {adminSidebarList.map((it, i) => (
              <SidebarItem
                key={i}
                icon={it.icon}
                title={it.name}
                link={it.link}
              />
            ))}
          </div>
        </div>

        <div className=" flex justify-between items-center mb-5 gap-5">
          <button className="h-10 rounded-md border-b w-8/12 font-roboto-mono border-red-800 bg-red-600 text-sm capitalize text-white">
            Reported Bugs
          </button>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeftFromLine
              className="hover:bg-red cursor-pointer"
              size={20}
            />
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-[calc(100vw-18rem)] h-screen grid grid-rows-[4rem_1fr]">
        {children}
      </div>
      {adminSidebar ? (
        <div
          className="absolute backdrop-blur-sm inset-0 z-10"
          onClick={() => setAdminSidebar(false)}
        />
      ) : null}
    </div>
  );
}
