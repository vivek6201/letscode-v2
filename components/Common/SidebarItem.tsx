"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarItem({
  title,
  icon,
  link,
}: {
  title: string;
  icon: React.ReactNode;
  link: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(link);

  return (
    <Link
      href={link}
      className={`px-4 py-2 rounded-md hover:bg-gray-200 hover:dark:bg-neutral-900 transition-all duration-200 flex gap-4 ${
        !isActive
          ? "text-black dark:text-white"
          : "bg-red-700 text-white font-semibold"
      } items-center`}
    >
      {icon}
      <p className="capitalize text-sm font-tilli select-none">{title}</p>
    </Link>
  );
}
