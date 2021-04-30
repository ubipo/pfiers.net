import { contentBaseUrl } from '@/enviroment/baseUrls'
import { toUrl } from '@/url'
import Cup from '@/url/Cup'
import { resolveCupUrl } from '@/url/resolve'
import { hrefWithoutProtocol, withExtension, withPathname } from '@/url/transform'
import marked from 'marked'


function linkToHtmlAnchor(href: string | null, title: string | null, text: string) {
  const titleAttr = title === null ? '' : `title="${title}"`
  const commonAttrs = `${titleAttr} class="link"`

  if (href == null) return `<a ${commonAttrs}>${text}</a>`

  const url = toUrl(href)
  const p = url.protocol
  const withoutProtocol = hrefWithoutProtocol(url)
  if (p === Cup.CONTENT) {
    const resolved = new URL(withoutProtocol, contentBaseUrl)
    const href = withPathname(resolved, `/content${resolved.pathname}`).href
    return `<a href="${href}" ${commonAttrs}>${text}</a>`
  } else if (p === Cup.EXTERNAL) {
    return `<a href="${withoutProtocol}" target="_blank" rel="noopener" ${commonAttrs}>${text}</a>`
  } else if (p === Cup.RELATIVE) {
    return `<router-link to="${withoutProtocol}" ${commonAttrs}>${text}</router-link>`
  } else {
    return `<a href="${url.href}" ${commonAttrs}>${text}</a>`
  }
}

const mimeTypes: Record<string, string> = {
  webp: 'image/webp'
}

function imgToHtmlImg(href: string, title: string, alt: string) {
  const url = toUrl(href)
  const alternativeFormats = url.searchParams.getAll("altFormat")
  const sourceTags = alternativeFormats.map(format => {
    const altUrl = withExtension(url, format)
    const mimeType = mimeTypes[format]
    return `<source type="${mimeType}" srcset="${resolveCupUrl(altUrl)}">`
  })
  const srcAttribute = href === null ? '' : `src="${resolveCupUrl(url)}"`
  const imgTag = `<img ${srcAttribute} title="${title}" alt="${alt}">`
  return `<picture>${sourceTags.join()}${imgTag}</picture>`
}

function markdownRendererFactory() {
  const renderer = new marked.Renderer()
  renderer.link = linkToHtmlAnchor
  renderer.image = imgToHtmlImg
  return renderer
}

const renderer = markdownRendererFactory()

export function parse(raw: string) {
  const html = marked.parse(raw, { renderer })
  return `<div>${html}</div>`
}
