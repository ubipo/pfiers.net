import createSharp, { type Sharp } from "sharp"
import fs from "fs/promises"
import path from "path"
import type { ImageMeta } from "./imageMeta"
import { parseSrcsetSizesString, type SrcsetItem, type SrcsetItemSize } from "../srcSet"
import parseYaml from "../yaml"


// Relative to server working directory (assumed to be project root)
const CONTENT_FOLDER = 'src/content'
const SRCSET_FOLDER_NAME = '_srcset'
const CONTENT_URL_BASE = '/content'

interface FilenameSrcsets {
  name: string
  sizes: string
}

const foldersFilenamesSrcsets = {} as Record<string, Record<string, SrcsetItemSize[]>>

export async function getFilenamesSrcsetSizes(parentFolder: string) {
  if (foldersFilenamesSrcsets[parentFolder] != null) return foldersFilenamesSrcsets[parentFolder]
  const filenamesSrcsetsPath = path.join(parentFolder, 'srcsets.yaml')
  const filenamesSrcsetsYaml = await (async () => {
    try {
      return await fs.readFile(filenamesSrcsetsPath, 'utf8')
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return undefined
      throw err
    }
  })()
  if (filenamesSrcsetsYaml == null) return {}
  const filenamesSrcsetsConfig = parseYaml(filenamesSrcsetsYaml) as FilenameSrcsets[]
  const filenamesSrcsets = filenamesSrcsetsConfig.reduce((acc, { name, sizes }) => ({
    ...acc, [name]: parseSrcsetSizesString(sizes)
  }), {} as Record<string, SrcsetItemSize[]>)
  foldersFilenamesSrcsets[parentFolder] = filenamesSrcsets
  return filenamesSrcsets
}

export async function createSrcSetForImage(
  image: Sharp,
  contentPath: string,
  sizes: SrcsetItemSize[] = [],
) {
  const parentFolder = path.dirname(contentPath)
  // This assumes we're on Linux ('/' as path separator), should probably fix
  const srcsetUrlBase = path.join(CONTENT_URL_BASE, parentFolder, SRCSET_FOLDER_NAME)
  const srcsetOutFolder = path.join(CONTENT_FOLDER, parentFolder, SRCSET_FOLDER_NAME)
  if (sizes.length > 0) {
    try {
      await fs.mkdir(srcsetOutFolder)
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e
    }
  }
  const filename = path.basename(contentPath)
  const srcset = await Promise.all(sizes.map(async ({ mediaQuery, size: width }) => {
    const outFilename = `${filename}-${width}.webp`
    const outPath = path.join(srcsetOutFolder, outFilename)
    const outExists = await fs.access(outPath).then(() => true).catch(() => false)
    const srcsetItem: SrcsetItem = {
      mediaQuery, size: width, url: `${srcsetUrlBase}/${outFilename}`
    }
    if (outExists) return srcsetItem
    await image.resize(width).webp({ quality: 80 }).toFile(outPath)
    return srcsetItem
  }))
  return srcset
}

export async function getImageMetaOnServer(contentPath: string): Promise<ImageMeta> {
  // Image instance
  const imageData = await fs.readFile(path.join(CONTENT_FOLDER, contentPath), { encoding: null })
  const image = createSharp(imageData)

  // Metadata
  const sharpMetadata = await image.metadata()
  const { width, height, format } = sharpMetadata
  if (width == null || height == null || format == null) {
    throw new Error(`Failed to get image metadata for ${contentPath}`)
  }

  // Placeholder
  const placeholderImage = await image
    .resize(6)
    .webp({ quality: 75 })
    .toBuffer()
  const placeholderBase64 = placeholderImage.toString('base64')
  const placeholder = `data:image/webp;base64,${placeholderBase64}`

  // Srcsets
  const parentFolder = path.dirname(path.join(CONTENT_FOLDER, contentPath))
  const filenamesSrcsetsSizes = await getFilenamesSrcsetSizes(parentFolder)
  const filename = path.basename(contentPath)
  const srcsetSizes = filenamesSrcsetsSizes[filename]
  const srcset = srcsetSizes == null
    ? undefined
    : await createSrcSetForImage(image, contentPath, srcsetSizes)

  return { width, height, format, placeholder, srcset }
}
