import { z } from "zod";

export const createTasksSchema = z.object({
  body: z
    .object({
      projectId: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
          message: "projectId is required and cannot be null",
          path: ["projectId"],
        }),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
      status: z
        .string()
        .min(5, { message: "Name must be greater than 5 characters!" }),
    })
    .strict(),
});

export const updateTasksSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      projectId: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
          message: "projectId is required and cannot be null",
          path: ["projectId"],
        }),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
      status: z
        .string()
        .min(5, { message: "Name must be greater than 5 characters!" }),
    })
    .strict(),
});
