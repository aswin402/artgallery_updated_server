import { z } from "zod"

export const artCreateSchema = z.object({
  artname: z.string().min(1, "Art name is required"),
  artist: z.string().min(1, "Artist is required"),
  price: z.coerce.number().int().positive(),
})

export const artUpdateSchema = z.object({
  artname: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  price: z.coerce.number().int().positive().optional(),
})

export const artIdSchema = z.object({
  id: z.coerce.number().int().positive(),
})
