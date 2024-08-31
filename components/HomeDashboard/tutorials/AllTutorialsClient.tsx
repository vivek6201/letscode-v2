"use client";
import ItemCard from "@/components/Common/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { Status } from "@prisma/client";
import React from "react";
import useSWR from "swr";

export default function AllTutorialsClient() {
  const { data, isLoading, error } = useSWR("/api/tutorials", fetcher);

  return (
    <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
      {error ? (
        <div>Error while fetching content</div>
      ) : isLoading ? (
        Array.from(
          [1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton className="w-full h-[220px]" key={index} />
          ))
        )
      ) : (
        data.tutorials.map(
          (it: {
            createdAt: string;
            description: string;
            id: number;
            slug: string;
            status: Status;
            title: string;
            updatedAt: string;
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
        )
      )}
    </div>
  );
}
