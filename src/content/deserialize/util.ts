import { toUrl } from "@/url"
import { OptionalProcessedValue } from "../types"
import DeserializationException from "./deserializationException"


export function addIffNotNull<T>(key: string, value: T | null, object: any, transform?: (value: T) => any) {
  if (value !== null) {
    object[key] = transform === undefined ? value : transform(value)
  }
}

export function makeUrlSafe(url: string): string {
  return encodeURIComponent(url.toLowerCase().replace(/ ?[ -] ?/g, '-'))
}

export function makeNullOrFun<T, S>(
  value: T | undefined,
  func: (value: T) => S
): S | null {
  return value === undefined
    ? null
    : func(value)
}

export function ifDefinedElse<T>(
  value: any,
  ifDefinedFn: (value: any) => T,
  elseFn: () => T
): T {
  return value !== undefined
    ? ifDefinedFn(value)
    : elseFn()
}

export function nullOrType<T>(
  value: any
): T | null {
  return value === undefined
    ? null
    : value as T
}

export function asOptionalProcessedValue<T>(
  value: any,
  ifDefinedFn: (value: any) => T,
  elseFn: () => T
): OptionalProcessedValue<T> {
  return {
    orig: nullOrType<T>(value),
    value: ifDefinedElse(value, ifDefinedFn, elseFn)
  }
}

export function stringOrThrow(value: any, ex: Error): string {
  if (typeof value !== "string") {
    throw ex
  }
  return value
}

export function mustBeEx(objectName: string, propName: string, what: string) {
  return new DeserializationException(
    `${objectName} property "${propName}" must be ${what}`
  )
}

export function mustBeExGen(objectName: string) {
  return (propName: string, what: string) => mustBeEx(objectName, propName, what)
}

export function mustBeStringOrNotDefinedExGen(objectName: string) {
  return (propName: string) => mustBeEx(objectName, propName, "either a string or not defined")
}

export function urlOrNullGen(objectName: string) {
  return (prop: any, propName: string) => makeNullOrFun(
    prop,
    v => toUrl(
      stringOrThrow(v, mustBeStringOrNotDefinedExGen(objectName)(propName))
    )
  )
}
