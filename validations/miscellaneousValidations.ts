import { z } from "zod";

export enum BugPriority {
  Low,
  Medium,
  High,
}

export type ReportValidationType = z.infer<typeof reportValidations>;

export const reportValidations = z
  .object({
    title: z.string().min(5),
    description: z.string().min(10),
    priority: z.nativeEnum(BugPriority).nullable(),
    whichSection: z.string(),
  })
  .refine((data) => data.priority !== null, {
    message: "Priority cannot be empty",
    path: ["priority"],
  });
