'use client'
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

const TutorialTable = () => {
  // const { data, isLoading, error } = useSWR(
  //   urls.tutorials,
  //   fetcher,
  // );

  //replace this once api is ready
  const data:{tutorials: any[]} = { tutorials: [] };

  return (
    <div className="my-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Tutorial</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.tutorials.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.tutorialName}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat(["ban", "id"]).format(
                  new Date(item.createdAt)
                )}
              </TableCell>
              <TableCell>
                {item.status}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/tutorial-builder/${item.slug}`}>
                  <Button variant={"link"}>View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </div>
  );
};

export default TutorialTable;