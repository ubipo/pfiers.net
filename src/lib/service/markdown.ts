import parseYaml from './yaml'
import { defaultOptions } from 'svelte-markdown/src/markdown-parser'
import { Lexer, marked } from 'marked';
import { isNonEmptyString } from './stringUtil';


export interface MarkdownDefinition {
  sourceFull: string,
  sourceContent: string,
  tokens: marked.TokensList
}

export const EMPTY_MARKDOWN_DEFINITION: MarkdownDefinition = {
  sourceFull: "",
  sourceContent: "",
  tokens: Object.assign([], { links: {} }),
}

type TokenProcessor<T extends marked.Token> = (token: T) => Promise<void>

let combinedOptions: undefined | marked.MarkedOptions = undefined

function createDirectiveTokenizerExtension(name: string) {
  const reDirective = new RegExp(`^\`\`\`{${name}}(?<args>.*)\\n(?<content>(?:.|\\n)+?)\\n\`\`\``)
  const reArg = / (?:(?:"(?<argQuoted>(?:[^"\\]|\.)*?)")|(?<arg>[^'"][^ ]+))/g
  const tokenizerExtension: marked.TokenizerExtension = {
    name: name,
    level: "block",
    start(src) {
      const match = src.indexOf(`\`\`\`{${name}}`)
      if (match == -1) return undefined
      return match
    },
    tokenizer(src, tokens) {
      const match = reDirective.exec(src)
      if (match) {
        const groups = match.groups
        if (groups == null) throw new Error(`Failed to parse directive {${name}}`)
        const { args: argsString, content } = groups
        const args = Array.from(argsString.matchAll(reArg))
          .map(argMatch => argMatch.groups?.argQuoted ?? argMatch.groups?.arg)
        const [urlRaw, nameRaw, usernameRaw, dateTimeRaw] = args
        const throwArgRequired = (argName: string, argNum: number) => {
          throw new Error(`Directive {${name}} must specify a ${argName} (argument ${argNum+1}, format: {${name}} url name username date-time)`)
        }
        const url = !isNonEmptyString(urlRaw) ? throwArgRequired('url', 0) : urlRaw
        const accountName = !isNonEmptyString(nameRaw) ? throwArgRequired('name', 1) : nameRaw
        const accountUsername = !isNonEmptyString(usernameRaw) ? throwArgRequired('username', 2) : usernameRaw
        const dateTime = !isNonEmptyString(dateTimeRaw) ? throwArgRequired('date-time', 3) : dateTimeRaw
        const innerTokens = this.lexer.blockTokens(content, [])
        return {
          type: name,
          raw: match[0],
          url,
          name: accountName,
          username: accountUsername,
          dateTime,
          tokens: innerTokens
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

  marked.use({ extensions: [
    createRoleTokenizerExtension("dropword"),
    createDirectiveTokenizerExtension("tweet")
  ] })
  return marked.defaults
}

type TokenProcessorOfType<
  T extends marked.Token["type"]
> = TokenProcessor<Extract<marked.Token, { type: T }>>

export type AllTokenProcessors = {
  [TokenType in marked.Token["type"]]: TokenProcessorOfType<TokenType>
}

export type TokenProcessors = Partial<AllTokenProcessors>

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
