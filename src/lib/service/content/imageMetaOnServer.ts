import createSharp from "sharp"
import fs from "fs/promises"
import type { ImageMeta } from "./imageMeta"


export async function getImageMetaOnServer(contentPath: string) {
  // Console log working directory
  const imageData = await fs.readFile(`src/content/${contentPath}`, { encoding: null })
  const sharp = createSharp(imageData)
  const sharpMetadata = await sharp.metadata()
  const { width, height, format } = sharpMetadata
  if (width == null || height == null || format == null) {
    throw new Error(`Failed to get image metadata for ${contentPath}`)
  }
  const meta: ImageMeta = { width, height, format }

  const placeholderImage = await sharp
    .resize(6)
    .webp({ quality: 40 })
    .toBuffer()
  const placeholderBase64 = placeholderImage.toString('base64')
  const placeholder = `data:image/webp;base64,${placeholderBase64}`

  return { meta, placeholder }
}
