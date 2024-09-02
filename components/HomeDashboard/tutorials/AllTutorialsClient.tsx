"use client";
import ItemCard from "@/components/Common/ItemCard";
import { $Enums, Status } from "@prisma/client";
import React from "react";

export default function AllTutorialsClient({
  tutorials,
}: {
  tutorials:
    | {
        id: number;
        title: string;
        description: string;
        slug: string;
        status: $Enums.Status;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | null;
}) {
  if (!tutorials) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p>No Content Found</p>
      </div>
    );
  }

  return (
    <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
      {tutorials?.map(
        (it: {
          createdAt: Date;
          description: string;
          id: number;
          slug: string;
          status: Status;
          title: string;
          updatedAt: Date;
        }) => {
          return (
            <ItemCard
              title={it.title}
              description={it.description}
              link={`/tutorials/${it.id}`}
              key={it.id}
            />
          );
        }
      )}
    </div>
  );
}
