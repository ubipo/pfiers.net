const contentRawModules = import.meta.glob("$content/**/*", { as: 'raw' })


export async function dynamicImportContentFile(contentPath: string) {
  const modulePath = `/src/content/${contentPath}`
  const loadModuleFn = contentRawModules[modulePath]
  if (loadModuleFn == null) return undefined
  const content = await loadModuleFn()
  return content
}



/// --- Old image metadata import code --- /
///
/// Not usable with prerendering because vite-imagetools images can't be fetched
/// using svelte fetch(). Instead, retrieving image metadata and placeholder are
/// handled in imageMeta.ts and only executed on the server.

// const contentImageMetaModules = import.meta.glob("$content/**/*.(jpg|jpeg|png|webp)", { as: 'metadata=height;width;format' })
// const contentImagePlaceholderModules = import.meta.glob("$content/**/*.(jpg|jpeg|png|webp)", { as: 'width=6&format=webp&quality=40'  })

// export interface ImageMeta {
//   width: number
//   height: number
//   format: string
// }

// // Base64 encoded webp placeholder image
// export type ImagePlaceholder = string

// async function imageBlobToBase64(blob: Blob) {
//   if (typeof window !== 'undefined') {
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onload = () => resolve(reader.result as string)
//       reader.onerror = reject
//       reader.readAsDataURL(blob)
//     })
//   }
//   const buffer = await blob.arrayBuffer()
//   const base64 = Buffer.from(buffer).toString('base64')
//   return `data:${blob.type};base64,${base64}`
// }

// const IMAGETOOLS_PREFIX = '/@imagetools/'

// export async function dynamicImportContentImage(fetchFn: FetchFn, contentPath: string) {
//   const modulePath = `/src/content/${contentPath}`
//   const loadMeta = contentImageMetaModules[modulePath]
//   const loadPlaceholder = contentImagePlaceholderModules[modulePath]
//   if (loadMeta == null || loadPlaceholder == null) return null
//   const meta = await loadMeta() as ImageMeta
//   const placeholderUrl = (await loadPlaceholder() as any).default as string
//   console.log('placeholderUrl', placeholderUrl)
//   if (!placeholderUrl.startsWith(IMAGETOOLS_PREFIX)) {
//     throw new Error(`Unexpected placeholder URL: ${placeholderUrl} (expected to start with ${IMAGETOOLS_PREFIX})`)
//   }
//   const placeholderImported = await import(`/@imagetools/${placeholderUrl.slice(IMAGETOOLS_PREFIX.length)}`)
//   console.log(placeholderUrl, placeholderImported)
//   const placeholderRes = await fetchFn(placeholderUrl)
//   if (!placeholderRes.ok) {
//     console.error(`Placeholder image ${placeholderUrl} could not be loaded (${placeholderRes.status})`)
//     return { meta, placeholder: "" }
//     // throw new Error(`Placeholder image ${placeholderUrl} could not be loaded (${placeholderRes.status})`)
//   }
//   const placeholderBlob = await placeholderRes.blob()
//   const placeholder = await imageBlobToBase64(placeholderBlob)
//   return { meta, placeholder }
// }
