import parseYaml from './yaml'
import { defaultOptions } from 'svelte-markdown/src/markdown-parser'
import { Lexer, marked } from 'marked';
import { isNonEmptyString } from './stringUtil';
import { urlFromString } from './url';
import { parseSrcsetSizesString, type SrcsetItemSize } from './srcSet';


export interface MarkdownDefinition {
  sourceFull: string,
  sourceContent: string,
  tokens: marked.TokensList
}

export const EMPTY_TOKENS =  Object.assign([], { links: {} })

export const EMPTY_MARKDOWN_DEFINITION: MarkdownDefinition = {
  sourceFull: "",
  sourceContent: "",
  tokens: EMPTY_TOKENS,
}

type Tokens = marked.Token | SrcSetImageToken

type TokenProcessor<T extends Tokens> = (token: T) => Promise<void>

export interface SrcSetImageToken {
  type: 'srcSetImage'
  raw: string
  href: string
  title: string
  sizes: SrcsetItemSize[]
}

type TokenProcessorOfType<
  T extends Tokens["type"]
> = TokenProcessor<Extract<Tokens, { type: T }>>

export type AllTokenProcessors = {
  [TokenType in Tokens["type"]]: TokenProcessorOfType<TokenType>
}

export type TokenProcessors = Partial<AllTokenProcessors>

let combinedOptions: undefined | marked.MarkedOptions = undefined

/**
 * Creates a marked tokenizer extension that parses Myst-like\[0] directives of
 * the form:
 * 
 * \```{directiveName} directiveArg1 directiveArg2  
 * :keywordArg1: keywordArgValue1  
 * :keywordArg2: keywordArgValue2  
 * Directive content  
 * ```
 * 
 * \[0]: https://jupyterbook.org/en/stable/content/myst.html#directives
 *
 * @param name Name of the directive
 * @param parseTokenArgs Function to parse the token's arguments and keywords
 * into the properties of the token
 * @returns Marked tokenizer extension
 */
function createDirectiveTokenizerExtension(
  name: string,
  parseTokenArgs: (args: string[], keywords: Record<string, string>) => Record<string, any>
) {
  const reDirective = new RegExp(`^\`\`\`{${name}}(?<argsStr>.*)\\n(?<keywordsStr>(?::[a-zA-Z0-9_-]+: .*\\n)*)?(?<content>(?:.|\\n)+\\n)?\`\`\``)
  const reArg = / (?:(?:"(?<argQuoted>(?:[^"\\]|\.)*?)")|(?<arg>[^'"][^ ]+))/g
  const reKeyword = /:(?<key>\w+): (?<value>.*)\n/g
  const tokenizerExtension: marked.TokenizerExtension = {
    name: name,
    level: "block",
    start(src) {
      const match = src.indexOf(`\`\`\`{${name}}`)
      if (match == -1) return undefined
      return match
    },
    tokenizer(src, _tokens) {
      const match = reDirective.exec(src)
      if (match) {
        const groups = match.groups as Record<string, string | undefined> | undefined
        if (groups == null) throw new Error(`Failed to parse directive {${name}}`)
        const { argsStr, keywordsStr, content } = groups
        const args = argsStr == null
          ? []
          : Array.from(argsStr.matchAll(reArg))
            .map(m => m.groups?.argQuoted ?? m.groups?.arg ?? "")
        const keywords = keywordsStr == null
          ? {}
          : Array.from(keywordsStr.matchAll(reKeyword))
            .reduce((acc, m) => ({
              ...acc, [m.groups?.key ?? ""]: m.groups?.value
            }), {})
        const tokenArgs = parseTokenArgs(args, keywords)
        const innerTokens = content == null
          ? EMPTY_TOKENS
          : this.lexer.blockTokens(content, [])
        return {
          type: name,
          raw: match[0],
          tokens: innerTokens,
          ...tokenArgs
        };
      }
    },
  }
  return tokenizerExtension
}

function createRoleTokenizerExtension(name: string) {
  const tokenizerExtension: marked.TokenizerExtension = {
    name: name,
    level: "inline",
    start(src) {
      const match = src.indexOf(`{${name}}\``)
      if (match == -1) return undefined
      return match
    },
    tokenizer(src, tokens) {
      const rule = new RegExp(`^{${name}}\`(.+)\``)
      const match = rule.exec(src);
      if (match) {
        const [raw, text] = match
        return {
          type: name,
          raw, text
        };
      }
    },
  }
  return tokenizerExtension
}

export function getCustomOptions() {
  if (combinedOptions) return combinedOptions

  const tweetExtensions = createDirectiveTokenizerExtension('tweet', (args) => {
    const [urlRaw, nameRaw, usernameRaw, dateTimeRaw] = args
    const throwArgRequired = (argName: string, argNum: number) => {
      throw new Error(`Directive {tweet} must specify a ${argName} (argument ${argNum+1}, format: {tweet} url name username date-time)`)
    }
    const url = !isNonEmptyString(urlRaw) ? throwArgRequired('url', 0) : urlRaw
    const accountName = !isNonEmptyString(nameRaw) ? throwArgRequired('name', 1) : nameRaw
    const accountUsername = !isNonEmptyString(usernameRaw) ? throwArgRequired('username', 2) : usernameRaw
    const dateTime = !isNonEmptyString(dateTimeRaw) ? throwArgRequired('date-time', 3) : dateTimeRaw
    return {
      url,
      name: accountName,
      username: accountUsername,
      dateTime,
    }
  })

  const srcSetImageExtension = createDirectiveTokenizerExtension('srcSetImage', (args, keywords) => {
    const [urlStr] = args
    const { alt, sizes: sizesStr } = keywords
    if (!isNonEmptyString(urlStr)) {
      throw new Error(`Directive {srcSetImage} must specify an image url (argument 1, format: {srcSetImage} url)`)
    }
    const url = urlFromString(urlStr)
    if (!isNonEmptyString(alt)) {
      throw new Error(`Directive {srcSetImage} must specify an alt keyword (format: {srcSetImage} url\\n:alt: alt-text)`)
    }
    if (!isNonEmptyString(sizesStr)) {
      throw new Error(`Directive {srcSetImage} must specify sizes keyword (format: {srcSetImage} url\\n:sizes: sizes)`)
    }
    const sizes = parseSrcsetSizesString(sizesStr)
    return { href: url, alt, sizes }
  })

  marked.use({ extensions: [
    createRoleTokenizerExtension("dropword"),
    tweetExtensions,
    srcSetImageExtension
  ] })
  return marked.defaults
}

export async function tokenizeMarkdown(
  markdown: string,
  tokenProcessors: TokenProcessors,
) {
  const combinedOptions = { ...defaultOptions, ...getCustomOptions() }
  const lexer = new Lexer(combinedOptions)
  const tokens = lexer.lex(markdown);
  const walkResults = marked.walkTokens(tokens, async function (token) {
    const tokenType = token.type as marked.Token["type"]
    const tokenProcessor = tokenProcessors[tokenType]
    if (tokenProcessor == null) return
    await (tokenProcessor as TokenProcessorOfType<typeof tokenType>)(token)
  }) as unknown as Promise<any>[]
  await Promise.all(walkResults)
  return tokens
}

export function parseMarkdownFrontMatter(markdown: string) {
  const frontMatterSplit = markdown.split(/^---$/m, 3)
  if (frontMatterSplit[0] !== '') return { frontMatter: undefined, content: markdown }
  const [_, frontMatterYaml, contentStr] = frontMatterSplit
  const content = contentStr as string | undefined
  return {
    frontMatter: parseYaml(frontMatterYaml),
    content
  }
}

export async function parseMarkdown(
  markdown: string, processors: TokenProcessors
) {
  const { frontMatter, content } = parseMarkdownFrontMatter(markdown)
  if (!isNonEmptyString(content)) return { frontMatter, definition: undefined }
  const tokens = await tokenizeMarkdown(content, processors)
  const definition: MarkdownDefinition = {
    sourceFull: markdown,
    sourceContent: content,
    tokens
  }
  return { frontMatter, definition }
}
