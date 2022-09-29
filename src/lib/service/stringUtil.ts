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
