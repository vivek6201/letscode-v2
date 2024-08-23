import { z } from "zod";
import { Status } from "@prisma/client";

export const addTutorialValidations = z.object({
  tutorialName: z.string().min(1),
  slug: z.string(),
  description: z.string().min(10),
  status: z.nativeEnum(Status).default(Status.Draft),
});

export const addFolderValidations = z.object({
  folderName: z.string().min(1),
  description: z.string().min(10), 
  sortingOrder: z
    .number()
    .refine((data) => data > 0, { message: "Value should be greater than 0" }),
});

export const addTopicsValidations = z.object({
  topicName: z.string().min(1),
  description: z.string(),
  content: z.string().min(10),
  slug: z.string().min(1),
  isPublished: z.boolean().default(false),
  sortingOrder: z.number(),
  metaTitle: z.string().min(1),
});
