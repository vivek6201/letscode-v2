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
import { Plus } from "lucide-react";
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

export default function AddChapterDialog() {
  const modalRef = useRef<HTMLButtonElement | null>(null);

  const handleModelCloseref = () => {
    if (modalRef.current) modalRef.current.click();
  };

  const form = useForm<z.infer<typeof addChapterValidations>>({
    resolver: zodResolver(addChapterValidations),
  });

  async function onSubmit(values: z.infer<typeof addChapterValidations>) {
    // try {
    //   const res = await axios.post(url.tutorialUrl, {
    //     ...values,
    //   });
    //   if (res.status === 201) {
    //     handleModelCloseref();
    //     form.reset();
    //     toast({
    //       title: "Tutorial created succesfully!",
    //       draggable: true,
    //     });
    //   }
    // } catch (error) {}
  }

  return (
    <Dialog>
      <DialogClose ref={modalRef} />
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Add New <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
                    <Input
                      placeholder="Enter Name of the Chapter"
                      {...field}
                    />
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
