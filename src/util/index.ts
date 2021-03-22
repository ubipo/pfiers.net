import { useTask } from "vue-concurrency"


/**
 * Returns true iff {superset} contains all elements from {subset}.
 */
export function arrayContainsArray<T>(superset: T[], subset: T[]): boolean {
  if (subset.length > superset.length) return false
  return subset.every(v => superset.includes(v))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(o: any): o is object {
  return typeof o === 'object' && !!o
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isTypedArray<T>(o: any, isType: (o: any) => o is T): o is T[] {
  if (!Array.isArray(o)) return false
  return o.every(isType)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPrimitiveArray<T>(o: any, primitive: string): o is T[] {
  if (!Array.isArray(o)) return false
  return o.every(e => typeof e === primitive)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function asTask<T>(promise: Promise<T>) {
  const a = useTask(function*() {
    promise.then()
  })
}

export function elvis<T, S>(value: T | null, fn: (value: T) => S) {
  return value === null ? null : fn(value)
}

export async function tryCatch<T>(tryBlock: () => Promise<T>, handleError: (error: any) => void) {
  try {
    return await tryBlock()
  } catch (error) {
    handleError(error)
    throw error
  }
}
