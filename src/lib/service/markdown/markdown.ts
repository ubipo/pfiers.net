import parseYaml from '../yaml'
import { defaultOptions } from 'svelte-markdown/src/markdown-parser'
import { Lexer, marked } from 'marked';
import { isNonEmptyString } from '../stringUtil';
import { resolveHrefForSource } from '../url';
import { parseSrcsetSizesString } from '../srcSet';
import { type TokenProcessors, processTokens } from './tokenProcessing';


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

const combinedOptions: undefined | marked.MarkedOptions = undefined

export function getSourceTokenProcessors(
  sourceDirRelativePath: string,
): TokenProcessors {
  return {
    image: async token => {
      token.href = resolveHrefForSource(sourceDirRelativePath, token.href)
    },
    link: async token => {
      token.href = resolveHrefForSource(sourceDirRelativePath, token.href)
    }
  }
}

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
    tokenizer(src) {
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
    tokenizer(src) {
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

export function getTokenizerOptions(sourceDirRelativePath: string) {
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
    const [unresolvedHref] = args
    const { alt, sizes: sizesStr } = keywords
    if (!isNonEmptyString(unresolvedHref)) {
      throw new Error(`Directive {srcSetImage} must specify an image url (argument 1, format: {srcSetImage} url)`)
    }
    const href = resolveHrefForSource(sourceDirRelativePath, unresolvedHref)
    if (!isNonEmptyString(alt)) {
      throw new Error(`Directive {srcSetImage} must specify an alt keyword (format: {srcSetImage} url\\n:alt: alt-text)`)
    }
    if (!isNonEmptyString(sizesStr)) {
      throw new Error(`Directive {srcSetImage} must specify sizes keyword (format: {srcSetImage} url\\n:sizes: sizes)`)
    }
    const sizes = parseSrcsetSizesString(sizesStr)
    return { href, alt, sizes }
  })

  marked.use({ extensions: [
    createRoleTokenizerExtension("dropword"),
    tweetExtensions,
    srcSetImageExtension
  ] })
  return marked.defaults
}

export async function tokenizeMarkdown(
  sourceFileDirPath: string,
  markdown: string,
) {
  const combinedOptions = { ...defaultOptions, ...getTokenizerOptions(sourceFileDirPath) }
  const lexer = new Lexer(combinedOptions)
  const tokens = lexer.lex(markdown);
  processTokens(tokens, getSourceTokenProcessors(sourceFileDirPath))
  return tokens
}

export function parseMarkdownFrontMatter(markdown: string) {
  const frontMatterSplit = markdown.split(/^---$/m, 3)
  const [preFrontMatter, ...postFrontMatterSplit] = frontMatterSplit
  if (preFrontMatter !== '') return { frontMatter: undefined, content: markdown }
  const [frontMatterYaml, contentStr] = postFrontMatterSplit
  const content = contentStr as string | undefined
  return {
    frontMatter: parseYaml(frontMatterYaml),
    content
  }
}

export async function parseMarkdown(sourceDirRelativePath: string, markdown: string) {
  const { frontMatter, content } = parseMarkdownFrontMatter(markdown)
  if (!isNonEmptyString(content)) return { frontMatter, definition: undefined }
  const tokens = await tokenizeMarkdown(sourceDirRelativePath, content)
  const definition: MarkdownDefinition = {
    sourceFull: markdown,
    sourceContent: content,
    tokens
  }
  return { frontMatter, definition }
}
