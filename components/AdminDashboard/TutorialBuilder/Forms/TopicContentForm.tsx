"use client";
import { addTopicsValidations } from "@/validations/tutorialValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ContentType } from "@prisma/client";
import { toast } from "sonner";

export default function TopicContentForm({
  tutorialId,
  content,
  parentContentId,
}: {
  tutorialId: number;
  content?: any;
  parentContentId: number;
}) {
  const form = useForm<z.infer<typeof addTopicsValidations>>({
    resolver: zodResolver(addTopicsValidations),
    defaultValues: {
      content: "",
      description: "",
      isPublished: false,
      metaTitle: "",
      slug: "",
      sortingOrder: 0,
      topicName: "",
    },
  });

  if (content) {

    //we have a bug here content updatation form is not performing well. 
    //check this if block
    const data = {
      topicName: content.title,
      slug: content.topicMetadata.slug,
      sortingOrder: content.sortingOrder,
      metaTitle: content.topicMetadata.metaTitle,
      description: content.description,
      content: content.topicMetadata.content,
    };

    Object.entries(data).forEach(([key, value]) =>
      form.setValue(key as keyof typeof data, value)
    );
  }

  async function onSubmit(values: z.infer<typeof addTopicsValidations>) {
    try {
      await axios.post("/api/admin/tutorial", {
        id: (content ? content.id : null),
        type: ContentType.Content,
        title: values.topicName,
        sortingOrder: values.sortingOrder,
        parentContentId,
        tutorialId,
        description: values.description,
        topicMetadata: {
          slug: values.slug,
          metaTitle: values.metaTitle,
          metaDescription: values.description,
          content: values.content,
        },
      });

      toast.success("Content created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("failed to create content!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <FormField
            control={form.control}
            name="topicName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="Give a unique slug" {...field} />
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
                    placeholder="Enter the Topic Number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Meta Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Give a short Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write the content of the Topic"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="self-start">
          Submit
        </Button>
      </form>
    </Form>
  );
}
