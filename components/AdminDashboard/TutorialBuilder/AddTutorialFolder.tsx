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

export default function AddTutorialFolder({
  tutorial,
  tutorialId,
  parentContentId,
}: {
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
}) {
  const dialogRef = useRef<null | HTMLButtonElement>(null);

  //used to open dialog box
  const handleDialogRef = () => {
    if (!dialogRef.current) return;
    dialogRef.current.click();
  };

  return (
    <>
      <div className="mb-10 flex justify-between items-center">
        <p className="text-xl md:text-2xl font-semibold">
          {tutorial?.title ?? "Tutorial Content"}
        </p>
        <Button onClick={handleDialogRef}>Add Content</Button>
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
