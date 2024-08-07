"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addChapterValidations } from "@/validations/tutorialValidations";
import { z } from "zod";
import createChapter from "@/actions/admin/Tutorials/chapterActions";
import { toast } from "sonner";

export default function AddChapterDialog({
  trigger,
  tutorialSlug,
}: {
  trigger: React.ReactNode;
  tutorialSlug: string;
}) {
  const modalRef = useRef<HTMLButtonElement | null>(null);

  const handleModelCloseref = () => {
    if (modalRef.current) modalRef.current.click();
  };

  const form = useForm<z.infer<typeof addChapterValidations>>({
    resolver: zodResolver(addChapterValidations),
    defaultValues: {
      chapterName: "",
      chapterNo: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof addChapterValidations>) {
    // console.log({ values, tutorialSlug });
    const { success } = await createChapter(values, tutorialSlug);

    if (!success) {
      toast.error("Failed to create chapter");
      return;
    }

    toast.success("Tutorial Created Successfully!");
    handleModelCloseref();
    return;
  }

  return (
    <Dialog>
      <DialogClose ref={modalRef} />
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="z-[3000]">
        <DialogHeader>
          <DialogTitle>Add Chapter</DialogTitle>
          <DialogDescription>
            Allows you to create a new chapter
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="chapterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name of the Chapter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chapterNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Serial No."
                      {...field}
                      type="number"
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
