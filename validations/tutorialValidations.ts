import { z } from "zod";

export const addTutorialValidations = z.object({
  tutorialName: z.string().min(1),
  slug: z.string(),
});

export const addChapterValidations = z.object({
  chapterName: z.string().min(1),
  chapterNo: z
    .number()
    .refine((data) => data > 0, { message: "Value should be greater than 0" }),
});

export const addTopicsValidations = z.object({
  topicName: z.string().min(1),
  content: z.string().min(10),
  slug: z.string().min(1),
  topicNo: z.number(),
});
