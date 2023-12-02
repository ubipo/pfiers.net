import createSharp, { type Sharp } from "sharp"
import fs from "fs/promises"
import path from "path"
import { parseSrcsetSizesString, type SrcsetItem, type SrcsetItemSize } from "../srcSet"
import parseYaml from "../yaml"
import { joinPath, splitPath } from "../url"
import { STATIC_DIR_SITE_RELATIVE_URL } from "../siteUrlConsts"
import { STATIC_DIR_PROJECT_RELATIVE_PATH } from "../projectPathConsts"
import { OUTSIDE_STATIC_DIR, type ImageMeta } from "./types"


const SRCSET_FOLDER_NAME = '_srcset'


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
  imageHref: string,
  imageAbsolutePath: string,
  sizes: SrcsetItemSize[] = [],
) {
  const imageFilename = path.basename(imageHref)
  const siteRelativeParentDirUrl = path.dirname(imageHref)
  const parentDirFs = path.dirname(imageAbsolutePath)
  const srcsetSiteRelativeDir = joinPath(siteRelativeParentDirUrl, SRCSET_FOLDER_NAME)
  const srcsetOutDirFsAbsolute = path.join(parentDirFs, SRCSET_FOLDER_NAME)
  if (sizes.length > 0) {
    try {
      await fs.mkdir(srcsetOutDirFsAbsolute)
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e
    }
  }
  const srcset = await Promise.all(sizes.map(async ({ mediaQuery, size: width }) => {
    const outFilename = `${imageFilename}-${width}.webp`
    const outPath = path.join(srcsetOutDirFsAbsolute, outFilename)
    const outExists = await fs.access(outPath).then(() => true).catch(() => false)
    const srcsetItem: SrcsetItem = {
      mediaQuery, size: width, href: `${srcsetSiteRelativeDir}/${outFilename}`
    }
    if (outExists) return srcsetItem
    await image.resize(width).webp({ quality: 80 }).toFile(outPath)
    return srcsetItem
  }))
  return srcset
}

export async function getImageMetaOnServer(imageHref: string) {
  // For: - imageHref = '/static-in-browser/content/images/my-image.jpg'
  //      - STATIC_DIR_PROJECT_RELATIVE_PATH = 'static-on-fs/'
  //      - STATIC_DIR_SITE_RELATIVE_URL = 'static-in-browser/'
  /** /home/john/site/static-on-fs/ **/
  const staticDirAbsolutePath = path.resolve(STATIC_DIR_PROJECT_RELATIVE_PATH)
  const staticDirSiteRelativeParts = splitPath(STATIC_DIR_SITE_RELATIVE_URL)
  const hrefParts = splitPath(imageHref)
  /** ["static-in-browser"] **/
  const hrefStaticDirParts = hrefParts.slice(0, staticDirSiteRelativeParts.length)
  /** ["content", "images", "my-image.jpg"] **/
  const hrefStaticRelativeParts = hrefParts.slice(staticDirSiteRelativeParts.length)
  const imageHrefIsInStaticDir = (
    hrefStaticDirParts.length === staticDirSiteRelativeParts.length &&
    hrefStaticDirParts.every((part, i) => part === staticDirSiteRelativeParts[i])
  )
  if (!imageHrefIsInStaticDir) {
    return OUTSIDE_STATIC_DIR
  }
  /** /home/john/site/static-on-fs/content/images/my-image.jpg **/
  const imageAbsolutePathFs = path.join(staticDirAbsolutePath, ...hrefStaticRelativeParts)
  if (!imageAbsolutePathFs.startsWith(staticDirAbsolutePath)) {
    return OUTSIDE_STATIC_DIR
  }

  // Image instance
  const imageData = await fs.readFile(imageAbsolutePathFs, { encoding: null })
  const image = createSharp(imageData)

  // Metadata
  const sharpMetadata = await image.metadata()
  const { width, height, format } = sharpMetadata
  if (width == null || height == null || format == null) {
    throw new Error(`Failed to get image metadata for ${imageHref}`)
  }

  // Placeholder
  const placeholderImage = await image
    .resize(6)
    .webp({ quality: 75 })
    .toBuffer()
  const placeholderBase64 = placeholderImage.toString('base64')
  const placeholder = `data:image/webp;base64,${placeholderBase64}`

  // Srcsets
  const parentFolder = path.dirname(imageAbsolutePathFs)
  const filenamesSrcsetsSizes = await getFilenamesSrcsetSizes(parentFolder)
  const filename = path.basename(imageHref)
  const srcsetSizes = filenamesSrcsetsSizes[filename]
  const srcset = srcsetSizes == null
    ? undefined
    : await createSrcSetForImage(image, imageHref, imageAbsolutePathFs, srcsetSizes)

  const relativePath = path.relative(staticDirAbsolutePath, imageAbsolutePathFs)
  const meta: ImageMeta = { width, height, format, placeholder, srcset }
  return { meta, relativePath }
}
