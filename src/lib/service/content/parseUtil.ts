import { Exception } from "$lib/service/exception"
import { stringLooseNormalize } from "$lib/service/stringUtil"
import { urlFromString } from "$lib/service/url"


export class ContentParseException extends Exception { }

export function toUrlSafeName(name?: string, urlSafeName?: string) {
  if (urlSafeName != null) return urlSafeName
  if (name == null) throw new ContentParseException('One of name or urlSafeName is required')
  return urlSafeName ??  stringLooseNormalize(name).replaceAll(' ', '-')
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function objectOrThrow(value: unknown, name: string) {
  if (!isObject(value)) throw new ContentParseException(`${name} must be an object`)
  return value
}

export function optionalStringOrThrow(value: unknown, name: string) {
  if (value == null) return undefined
  if (typeof value !== 'string') throw new ContentParseException(`${name} must be a string`)
  return value
}

export function stringOrThrow(value: unknown, name: string) {
  if (value == null) throw new ContentParseException(`${name} is required`)
  if (typeof value !== 'string') throw new ContentParseException(`${name} must be a string`)
  return value
}

export function optionalUrlOrThrow(value: unknown, name: string) {
  const str = optionalStringOrThrow(value, name)
  if (str == null) return undefined
  return urlFromString(str)
}

export function arrayOrThrow(value: unknown, name: string) {
  if (value == null) throw new ContentParseException(`${name} is required`)
  if (!Array.isArray(value)) throw new ContentParseException(`${name} must be an array`)
  return value
}

export function optionalStrArrOrThrow(value: unknown, name: string) {
  if (value == null) return undefined
  const array = arrayOrThrow(value, name)
  if (!array.every(v => typeof v === 'string')) {
    throw new ContentParseException(`${name} must be an array of strings`)
  }
  return array as string[]
}
