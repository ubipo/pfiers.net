declare module '*.json' {
  const value: string
  export default value
}

declare module '*.md' {
  const value: string
  export default value
}

declare module '*.txt' {
  const value: string
  export default value
}

declare module '*.jschema' {
  const value: string
  export default value
}

declare module '*.html' {
  const value: string
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}

declare module 'assets/img/icons/tech/*.svg' {
  const value: {
    id: string,
    viewBox: string,
    url: string
  }
  export default value
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const value: DefineComponent
  export default value
}
