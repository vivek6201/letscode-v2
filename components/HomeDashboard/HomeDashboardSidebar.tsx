"use client";
import React from "react";
import HomeDashboardNavbar from "./HomeDashboardNavbar";
import Image from "next/image";
import SidebarItem from "../Common/SidebarItem";
import { homeSidebarList } from "@/constants/SidebarList";
import { ArrowLeftFromLine, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRecoilState } from "recoil";
import { homeDashSidebarAtom } from "@/store/sidebarStore";
import Link from "next/link";

export default function HomeDashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [homeDashSidebar, setHomeDashSidebar] =
    useRecoilState(homeDashSidebarAtom);

  return (
    <div className="flex">
      <div
        className={`border-r h-screen z-20 transition-transform duration-500 ease-in-out lg:flex lg:relative lg:translate-x-0 absolute flex ${
          homeDashSidebar ? "translate-x-0" : "-translate-x-full"
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
              onClick={() => setHomeDashSidebar(!homeDashSidebar)}
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col gap-y-2 mt-16">
            {homeSidebarList.map((it, i) => (
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
          <button className="px-10 py-[7px] rounded-md border-b w-8/12 font-roboto-mono border-red-800 bg-red-600 text-sm capitalize text-white">
            Report Bug
          </button>
          <Button variant={"outline"} size={"icon"}>
            <ArrowLeftFromLine
              className="hover:bg-red cursor-pointer"
              size={20}
            />
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-[calc(100vw-18rem)] h-screen">{children}</div>
      {homeDashSidebar ? (
        <div
          className="absolute backdrop-blur-sm inset-0 z-10 "
          onClick={() => setHomeDashSidebar(false)}
        />
      ) : null}
    </div>
  );
}
