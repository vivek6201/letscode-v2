'use client'
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

export default function AddTutorialDialog() {

  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const handleModelCloseref = () => {
    if (modalCloseRef.current) modalCloseRef.current.click();
  };

  const form = useForm<z.infer<typeof addTutorialValidations>>({
    resolver: zodResolver(addTutorialValidations),
  });

  async function onSubmit(values: z.infer<typeof addTutorialValidations>) {
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
      <DialogClose ref={modalCloseRef} />
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Add New <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
