export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'babele:theme'

export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage non disponibile (es. storage bloccato): ricadiamo sulla preferenza di sistema.
  }
  if (typeof window.matchMedia !== 'function') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignorato: il tema resta applicato per la sessione corrente anche senza persistenza.
  }
}
