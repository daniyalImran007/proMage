import { z } from "zod";

export const createProjectSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      manager: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
      running: z.boolean(),
    })
    .strict(),
});

export const updateProjectSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      manager: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      description: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
    })
    .strict(),
});
