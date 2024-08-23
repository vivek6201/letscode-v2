"use client";
import { addTopicsValidations } from "@/validations/tutorialValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function TopicContentForm({ content }: { content?: any }) {
  const topicContentForm = useForm<z.infer<typeof addTopicsValidations>>({
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

  return <div>
    
  </div>;
}
