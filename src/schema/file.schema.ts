import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
]

export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => ALLOWED_TYPES.includes(file.type), {
    message: "Only JPG, PNG, and WEBP images are allowed",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image must be smaller than 5MB"
  ,
  })
