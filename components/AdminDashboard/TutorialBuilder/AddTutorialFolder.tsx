"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { $Enums } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addFolderValidations } from "@/validations/tutorialValidations";
import { z } from "zod";
import FolderContentForm from "./Forms/FolderContentForm";
import { useRouter } from "next/navigation";

interface AddTutorialFolderType {
  rest: string[];
  tutorial: {
    id: number;
    title: string;
    description: string;
    slug: string;
    status: $Enums.Status;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  tutorialId: number;
  parentContentId: number;
  currentContent?: { title: string; id: number };
}

export default function AddTutorialFolder({
  rest,
  tutorial,
  tutorialId,
  parentContentId,
  currentContent,
}: AddTutorialFolderType) {
  const dialogRef = useRef<null | HTMLButtonElement>(null);
  const router = useRouter();

  //used to open dialog box
  const handleDialogRef = () => {
    if (!dialogRef.current) return;
    dialogRef.current.click();
  };

  let updatedRoute = `/admin/tutorial-builder/${tutorialId}`;

  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  const contentRouteHandler = () => {
    updatedRoute += "/new-topic";

    //pushing user to add new topic route
    router.push(updatedRoute);
  };

  return (
    <>
      <div className="mb-10 flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl md:text-2xl font-semibold">
            {tutorial?.title ?? "Tutorial Content"}
          </p>

          {/* add folder name */}
          <p className="opacity-70">{currentContent?.title}</p>
        </div>
        <div className="flex gap-5 items-center">
          <Button onClick={handleDialogRef}>Add New Folder</Button>
          <Button onClick={contentRouteHandler}>Add New Content</Button>
        </div>
      </div>
      <ContentDialog
        dialogRef={dialogRef}
        tutorialId={tutorialId}
        parentContentId={parentContentId}
      />
    </>
  );
}

function ContentDialog({
  dialogRef,
  tutorialId,
  parentContentId,
}: {
  dialogRef: React.MutableRefObject<HTMLButtonElement | null>;
  tutorialId: number;
  parentContentId: number;
}) {
  const folderContentForm = useForm<z.infer<typeof addFolderValidations>>({
    resolver: zodResolver(addFolderValidations),
    defaultValues: {
      folderName: "",
      sortingOrder: 0,
    },
  });

  return (
    <Dialog>
      <DialogTrigger ref={dialogRef} />
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="md:min-w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>
          <DialogDescription>
            This sections allows you to add chapter to your tutorial.
          </DialogDescription>
        </DialogHeader>
        {/* This component renders the form to add folder as children */}
        <FolderContentForm
          form={folderContentForm}
          parentContentId={parentContentId}
          tutorialId={tutorialId}
        />
      </DialogContent>
    </Dialog>
  );
}
