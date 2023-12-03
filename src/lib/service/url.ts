/**
 * Terminology:
 * - URI, URL, URN: as per https://datatracker.ietf.org/doc/html/rfc3986#section-1.1.3
 * - href: a relative or absolute URI, or a filesystem path (in practice: just about anything)
 * 
 * General notes:
 * URI scheme syntax:
 * scheme      = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
 * From: https://datatracker.ietf.org/doc/html/rfc3986#section-3.1
 *
 * So, hello.jpeg is a valid scheme (not a URI though)
 * hello.jpeg: is a valid URI (with scheme hello.jpeg)
 * 
 * To use a filesystem path that is a valid URI as an href, prefix it with './'
 * (making it an invalid URI, as a scheme must start with an ALPHA character
 * and cannot contain "/").
 */

import { removePrefix, removeSuffix } from "./stringUtil"


const KNOWN_SCHEMES = ["http", "https", "mailto"]

export function isUri(href: string): boolean {
  try {
    // 'URL' constructor also parses URIs ¯\_(ツ)_/¯ (in fact you would need
    // knowledge of the URI scheme to know if it's a URL or URN).
    // Also, by not specifying a base URL, only absolute URLs are allowed.
    // For relative URLs, `resolveHrefForRoute` should be used.
    const uri = new URL(href)
    if (!KNOWN_SCHEMES.includes(removeSuffix(uri.protocol, ":"))) {
      // URIs with a different scheme may well be valid, just suspicious
      console.warn(`isUri: '${href}' has unknown scheme '${uri.protocol}'`)
    }
    return true
  } catch(e) {
    if (e instanceof TypeError) return false
    throw e
  }
}

export function checkHrefValid(href: string) {
  // An href can be anything, so we can't check it in any meaningful way.
  // We can however parse the URI and warn if it has an unknown scheme.
  isUri(href)
}

export function isAbsolutePath(path: string) {
  return path.startsWith("/")
}

export function isQueryOrFragment(path: string) {
  return path.startsWith("?") || path.startsWith("#")
}

export function shouldBeResolved(path: string) {
  return !(isUri(path) || isAbsolutePath(path) || isQueryOrFragment(path))
}

export function slashNormalize(path: string) {
  return removePrefix(removeSuffix(path, "/"), "./")
}

/**
 * Join parts of a path, removing any duplicate slashes.
 * Does not remove leading slash of first or trailing slash of last part.
 * Does not remove repeated leading or trailing slashes.
 */
export function joinPath(...parts: string[]) {
  if (parts.length === 0) return ""
  if (parts.length === 1) return parts[0]
  const withoutInnerSlashes = parts.map((part, i) => {
    if (i === 0) return removeSuffix(part, "/")
    if (part.startsWith("/")) {
      throw new Error(`joinPath: middle part starts with '/' (part ${i}: '${part}' of ${parts})`)
    }
    if (i === parts.length - 1) return removePrefix(part, "./")
    return slashNormalize(part)
  })
  return withoutInnerSlashes.join("/")
}

export function splitPath(path: string) {
  return slashNormalize(path).split("/")
}

export function countParts(path: string) {
  const parts = splitPath(path)
  if (parts.length === 1 && parts[0] === "") return 0
  return parts.length
}

export function resolveHrefForSource(
  sourceDirRelativePath: string,
  href: string,
) {
  if (shouldBeResolved(href)) {
    return joinPath(sourceDirRelativePath, href)
  }
  return href
}

export function routeIdToRelativeRootPath(routeId: string | null): string {
  if (routeId == null) {
    throw new TypeError("routeId is null")
  }
  return "../".repeat(countParts(routeId))
}

/**
 * Anything which isn't strictly a URI is assumed to be a relative path.
 * To reference a relative path that looks like a URI, prefix it with './'.
 */
export function resolveHrefForRoute(
  routeId: string | null,
  href: string,
): string {
  if (shouldBeResolved(href)) {
    const rootPath = routeIdToRelativeRootPath(routeId)
    return joinPath(rootPath, href)
  }
  return href
}
