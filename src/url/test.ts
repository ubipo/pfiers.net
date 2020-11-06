import Cup from "./Cup"


export function isHttpUrl(url: URL) {
  return ['http:', 'https:'].includes(url.protocol)
}

export function isRelative(url: URL) {
  return url.protocol === Cup.RELATIVE
}
