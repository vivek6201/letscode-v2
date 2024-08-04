"use client";
import React, { useRef } from "react";
import AddChapterDialog from "@/components/AdminDashboard/TutorialBuilder/Chapter/AddChapterDialog";
import ChapterCard from "@/components/AdminDashboard/TutorialBuilder/Chapter/ChapterCard";
import { Button } from "@/components/ui/button";
import CustomIcon from "@/components/ui/custom-icon";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const openModalRef = useRef<HTMLButtonElement | null>(null);

  const handleModalOpen = async () => {};

  return (
    <div className="md:p-10 p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <CustomIcon iconName={ArrowLeft} />
          </Button>
          <p className="font-bold text-2xl">Chapters</p>
        </div>
        <AddChapterDialog
          trigger={
            <Button className="flex gap-2 items-center">
              Add New <CustomIcon iconName={Plus} />
            </Button>
          }
        />
      </div>
      <div className="pt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
        {/* Grid for all tutorials card listed */}
        <ChapterCard
          title="Array"
          description="Awesome Content"
          handleOpenModal={handleModalOpen}
        />
        <ChapterCard
          title="Array"
          description="Awesome Content"
          handleOpenModal={handleModalOpen}
        />
        <ChapterCard
          title="Array"
          description="Awesome Content"
          handleOpenModal={handleModalOpen}
        />
      </div>
    </div>
  );
}
