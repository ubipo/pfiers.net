export class Exception extends Error {
  // public name = 'Exception'
}

export class IllegalArgumentException extends Exception {
  constructor(arg: string, val: string | object, reason: string) {
    super(`<${arg}> ("${val}") ${reason}`)
    this.arg = arg
    this.val = String(val)
    this.reason = reason
  }

  readonly arg: string
  readonly val: string
  readonly reason: string

  // public name = 'IllegalArgumentException'
}
