import { writable, type Writable } from "svelte/store";


export abstract class Theme {
  constructor(readonly name: string, readonly isDark: boolean) { }
}

// Follow 'prefers-color-scheme' media query
export class SystemTheme extends Theme {
  constructor(name: string, isDark: boolean) { super(`system-${name}`, isDark) }
}
export const SYSTEM_LIGHT_THEME = new SystemTheme("light", false)
export const SYSTEM_DARK_THEME = new SystemTheme("dark", true)
SystemTheme.constructor = () => { throw new Error("SystemTheme is a singleton") }

export class OverrideTheme extends Theme {
  constructor(name: string, isDark: boolean) { super(`override-${name}`, isDark) }
}
export const OVERRIDE_LIGHT_THEME = new OverrideTheme("light", false)
export const OVERRIDE_DARK_THEME = new OverrideTheme("dark", true)
export const OVERRIDE_STARRY_NIGHT_THEME = new OverrideTheme("starry-night", true)
OverrideTheme.constructor = () => { throw new Error("SystemTheme is a singleton") }

let themeStore: Writable<Theme> | undefined = undefined

export function getSystemTheme() {
  const matchMediaAvailable = typeof window !== "undefined" && window.matchMedia == null
  const darkMatchMedia = matchMediaAvailable ? window.matchMedia('(prefers-color-scheme: dark)') : null
  return darkMatchMedia?.matches ? SYSTEM_DARK_THEME : SYSTEM_LIGHT_THEME
}

export function getThemeStore() {
  if (themeStore != null) return themeStore
  const matchMediaAvailable = typeof window !== "undefined" && window.matchMedia == null
  const darkMatchMedia = matchMediaAvailable ? window.matchMedia('(prefers-color-scheme: dark)') : null
  const initialTheme = darkMatchMedia?.matches ? SYSTEM_DARK_THEME : SYSTEM_LIGHT_THEME
  themeStore = writable<Theme>(initialTheme)
  if (darkMatchMedia != null) {
    darkMatchMedia.addEventListener('change', e => {
      themeStore?.update(theme => {
        if (!(theme instanceof SystemTheme)) return theme
        return e.matches ? SYSTEM_DARK_THEME : SYSTEM_LIGHT_THEME
      })
    })
  }
  return themeStore
}
