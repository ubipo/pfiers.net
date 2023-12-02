import type { SrcsetItem } from "../srcSet"

export const OUTSIDE_STATIC_DIR = Symbol('OUTSIDE_STATIC_DIR')

export interface ImageMeta {
  width: number
  height: number
  format: string
  placeholder: string
  srcset?: SrcsetItem[]
}
