import { prisma } from "../utils/prisma"
import { saveImage } from "../utils/save_image"
import {
  artCreateSchema,
  artUpdateSchema,
  artIdSchema,
} from "../schema/art.schema"

import { imageFileSchema } from "../schema/file.schema"

// GET ALL ARTS 
export const getArts = async (c: any) => {
  const arts = await prisma.art.findMany()
  return c.json(arts, 200)
}

// GET ART BY ID 
export const getArtById = async (c: any) => {
  const { id } = artIdSchema.parse(c.req.param())

  const art = await prisma.art.findUnique({
    where: { id },
  })

  if (!art) {
    return c.json({ message: "Art not found" }, 404)
  }

  return c.json(art, 200)
}

//CREATE ART (multipart/form-data) 
export const createArt = async (c: any) => {
  const formData = await c.req.formData()

  // Validate text fields
  const data = artCreateSchema.parse({
    artname: formData.get("artname"),
    artist: formData.get("artist"),
    price: formData.get("price"),
  })

  // Optional image
  let imageUrl: string | null = null
  const file = formData.get("image")

  if (file) {
    const validatedFile = imageFileSchema.parse(file)
    imageUrl = await saveImage(validatedFile)
  }

  const art = await prisma.art.create({
    data: {
      ...data,
      imageUrl,
    },
  })

  return c.json(art, 201)
}

// UPDATE ART BY ID 
export const updateArtById = async (c: any) => {
  const { id } = artIdSchema.parse(c.req.param())
  const body = artUpdateSchema.parse(await c.req.json())

  const existingArt = await prisma.art.findUnique({
    where: { id },
  })

  if (!existingArt) {
    return c.json({ message: "Art not found" }, 404)
  }

  const updatedArt = await prisma.art.update({
    where: { id },
    data: body,
  })

  return c.json(updatedArt, 200)
}

// DELETE ART
export const deleteArt = async (c: any) => {
  const { id } = artIdSchema.parse(c.req.param())

  const art = await prisma.art.findUnique({
    where: { id },
  })

  if (!art) {
    return c.json({ message: "Art not found" }, 404)
  }

  await prisma.art.delete({
    where: { id },
  })

  return c.json(
    {
      message: "Art deleted successfully",
      id,
    },
    200
  )
}

// UPLOAD / UPDATE ART IMAGE 
export const uploadArtImage = async (c: any) => {
  const { id } = artIdSchema.parse(c.req.param())

  const formData = await c.req.formData()
  const file = imageFileSchema.parse(formData.get("image"))

  const imageUrl = await saveImage(file)

  const art = await prisma.art.update({
    where: { id },
    data: { imageUrl },
  })

  return c.json(art, 200)
}
