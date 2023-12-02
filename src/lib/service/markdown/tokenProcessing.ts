import { marked } from "marked";
import type { ImageWithMetaToken } from "./types";


export type Tokens = marked.Token | ImageWithMetaToken
export type TokenTypes = Tokens["type"]
export type TokenProcessor<T extends Tokens> = (token: T) => Promise<void>
export type TokenProcessorOfType<
  T extends TokenTypes
> = TokenProcessor<Extract<Tokens, { type: T }>>
export type AllTokenProcessors = {
  [TokenType in TokenTypes]: TokenProcessorOfType<TokenType>
}
export type TokenProcessors = Partial<AllTokenProcessors>

export async function walkTokens(
  tokens: marked.TokensList,
  operator: (token: marked.Token) => Promise<void>,
) {
  const promises: Promise<void>[] = []
  marked.walkTokens(tokens, token => {
    promises.push(operator(token))
  })
  await Promise.all(promises)
}

export async function processTokens(
  tokens: marked.TokensList,
  processors: TokenProcessors,
) {
  await walkTokens(tokens, async function (token) {
    const tokenProcessor = processors[token.type]
    if (tokenProcessor == null) return
    await (tokenProcessor as TokenProcessorOfType<typeof token.type>)(token)
  })
}
