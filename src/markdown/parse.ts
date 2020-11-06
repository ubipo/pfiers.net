import { contentOrigin } from '@/enviroment/content'
import { toUrl } from '@/url'
import Cup from '@/url/Cup'
import { resolveCupUrl } from '@/url/resolve'
import { hrefWithoutProtocol, withPathname } from '@/url/transform'
import marked from 'marked'


function linkToAnchorElem(href: string | null, title: string | null, text: string) {
  const titleAttr = title === null ? '' : `title="${title}"`
  const commonAttrs = `${titleAttr} class="link"`

  if (href == null) return `<a ${commonAttrs}>${text}</a>`

  const url = toUrl(href)
  const p = url.protocol
  const withoutProtocol = hrefWithoutProtocol(url)
  if (p === Cup.CONTENT) {
    const resolved = new URL(withoutProtocol, contentOrigin)
    const href = withPathname(resolved, `/content${resolved.pathname}`).href
    return `<a href="${href}" ${commonAttrs}>${text}</a>`
  } else if (p === Cup.EXTERNAL) {
    return `<a href="${withoutProtocol}" target="_blank" ${commonAttrs}>${text}</a>`
  } else if (p === Cup.RELATIVE) {
    return `<router-link to="${withoutProtocol}" ${commonAttrs}>${text}</router-link>`
  } else {
    return `<a href="${url.href}" ${commonAttrs}>${text}</a>`
  }
}

function markdownRendererFactory() {
  const renderer = new marked.Renderer()
  renderer.link = linkToAnchorElem
  renderer.image = (href, title, text) => {
    const src = href === null ? '' : `src="${resolveCupUrl(toUrl(href))}"`
    return `<img ${src} title="${title}" alt="${text}">`
  }
  return renderer
}

const renderer = markdownRendererFactory()

export function parse(raw: string) {
  const html = marked.parse(raw, { renderer })
  return `<div>${html}</div>`
}
