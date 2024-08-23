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
import { addTutorialValidations } from "@/validations/tutorialValidations";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import createTutorial from "@/actions/admin/Tutorials/tutorialActions";
import { toast } from "sonner";

export default function AddTutorialDialog() {
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const handleModelCloseref = () => {
    if (modalCloseRef.current) modalCloseRef.current.click();
  };

  const form = useForm<z.infer<typeof addTutorialValidations>>({
    resolver: zodResolver(addTutorialValidations),
    defaultValues: {
      description: "",
      slug: "",
      tutorialName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addTutorialValidations>) {
    const { error, success } = await createTutorial(values);

    if (success) {
      handleModelCloseref();
      form.reset();
      toast.success("tutorial Created Successfully", {
        dismissible: true,
      });
    }

    if (error) {
      console.log({ error });
      toast.error("Error while creating tutorial", {
        dismissible: true,
      });
    }
  }

  return (
    <Dialog>
      <DialogClose ref={modalCloseRef} />
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Add New <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="z-[3000]"
      >
        <DialogHeader>
          <DialogTitle>Add Tutorial</DialogTitle>
          <DialogDescription>
            Allows you to create a new tutorial
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tutorialName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutorial Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name of the tutorial"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a short description of the tutorial"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Name of the tutorial"
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value.replace(/\s/g, "-"));
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
