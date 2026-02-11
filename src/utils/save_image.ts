import { writeFile, mkdir } from "fs/promises"
import { v4 as uuid } from "uuid"
import path from "path"

const sanitizeFileName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')        // spaces → -
    .replace(/[^a-z0-9.-]/g, '') // remove special chars
}

export const saveImage = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer())

  const ext = path.extname(file.name)
  const baseName = path.basename(file.name, ext)

  const safeName = sanitizeFileName(baseName)
  const shortId = uuid().split("-")[0]

  const fileName = `${safeName}-${shortId}${ext}`

  const uploadDir = path.join(process.cwd(), "uploads")
  await mkdir(uploadDir, { recursive: true })

  const uploadPath = path.join(uploadDir, fileName)
  await writeFile(uploadPath, buffer)

  return `/uploads/${fileName}`
}
