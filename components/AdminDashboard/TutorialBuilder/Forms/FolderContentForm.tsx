"use client";
import { addFolderValidations } from "@/validations/tutorialValidations";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
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
import axios from "axios";
import { ContentType } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import CustomIcon from "@/components/ui/custom-icon";

export default function FolderContentForm({
  form,
  parentContentId,
  tutorialId,
}: {
  form: UseFormReturn<z.infer<typeof addFolderValidations>, undefined>;
  tutorialId: number;
  parentContentId: number;
}) {
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(
    values: z.infer<typeof addFolderValidations>
  ) {
    setLoading(true);
    try {
      await axios.post("/api/admin/tutorial", {
        type: ContentType.Folder,
        title: values.folderName,
        description: values.description,
        sortingOrder: values.sortingOrder,
        parentContentId,
        tutorialId,
      });
      toast.success("Folder Created Successfully!");
    } catch (error) {
      toast.error("Error while creating Folder!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-y-5"
      >
        <FormField
          control={form.control}
          name="folderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folder Name</FormLabel>
              <FormControl>
                <Input placeholder="Folder Name" {...field} />
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
              <FormLabel>Folder Desscription</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description about the Folder/Chapter"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortingOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sorting Order</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Sorting Order"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-5 flex items-center gap-3" disabled={loading}>
          {
            loading ? <CustomIcon iconName={Loader} className="animate-spin" /> : null
          }
          
          Submit
        </Button>
      </form>
    </Form>
  );
}
