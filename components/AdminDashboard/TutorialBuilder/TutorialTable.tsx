"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { urls } from "@/constants/urls";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const TutorialTable = () => {
  const { data, isLoading, error } = useSWR(urls.tutorials, fetcher);

  return (
    <div className="my-10">
      {error ? (
        <div className="min-h-[500px] flex justify-center items-center">
          <p>Error Occured while loading data</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col">
          <Skeleton className="w-full h-5" />
          <div className="flex gap-5 items-center justify-between mt-5">
            {Array.from([1, 2, 3, 4, 5]).map((it, i) => {
              return <Skeleton className="h-6 w-full" key={i} />;
            })}
          </div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="overflow-x-auto">
              <TableHead className="w-[100px]">S.No</TableHead>
              <TableHead>Tutorial</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {data.tutorials.map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat(["ban", "id"]).format(
                    new Date(item.createdAt)
                  )}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/tutorial-builder/${item.id}`}>
                    <Button variant={"link"}>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TutorialTable;
