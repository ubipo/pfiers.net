export function urlFromString(str: string): URL {
  try {
    return new URL(str)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TypeError(`${error.message}: ${str}`)
    }
    throw error
  }
}
