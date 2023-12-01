export function stringLooseNormalize(str: string) {
  return str.normalize().trim().toLowerCase()
    .replaceAll(/[\u00AD]/g, '') // soft hyphen
}

export function stringLooseEqual(a: string, b: string) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  return stringLooseNormalize(a) === stringLooseNormalize(b)
}

export function isNonEmptyString(str: string | undefined): str is string {
  if (str == null) return false
  return stringLooseNormalize(str) !== ''
}

let textArea: HTMLTextAreaElement | undefined = undefined
export function decodeHTMLEntities(text: string) {
  if (textArea == null) textArea = document.createElement('textarea')
  textArea.innerHTML = text;
  return textArea.value;
}

export function removePrefix(str: string, prefix: string) {
  if (!str.startsWith(prefix)) return str
  return str.substring(prefix.length)
}

export function removeSuffix(str: string, suffix: string) {
  if (!str.endsWith(suffix)) return str
  return str.substring(0, str.length - suffix.length)
}
