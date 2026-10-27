import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { applyTheme, getPreferredTheme, type Theme } from '../theme'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/vocabolario', label: 'Vocabolario' },
  { to: '/grammatica', label: 'Grammatica' },
  { to: '/ascolta-guarda', label: 'Ascolta & guarda' },
  { to: '/musica', label: 'Musica' },
  { to: '/leggi', label: 'Leggi' },
  { to: '/pronuncia', label: 'Pronuncia' },
  { to: '/scrivi', label: 'Scrivi' },
  { to: '/conversa', label: 'Conversa' },
  { to: '/confusioni', label: 'Confusioni' },
  { to: '/statistiche', label: 'Statistiche' },
  { to: '/impostazioni', label: 'Impostazioni' },
]

function linkClass({ isActive }: { isActive: boolean }): string {
  return [
    'block rounded px-3 py-2 text-sm font-medium',
    isActive
      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
      : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800',
  ].join(' ')
}

export function AppShell() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenuto" className="skip-link">
        Salta al contenuto
      </a>

      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <span className="text-lg font-bold">Babele</span>

          <button
            type="button"
            className="rounded px-3 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="nav-principale"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>

          <nav className="hidden md:block" aria-label="Navigazione principale">
            <ul className="flex flex-wrap gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="hidden rounded border border-slate-400 px-3 py-2 text-sm hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-800 md:block"
            aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {menuOpen && (
          <nav id="nav-principale" aria-label="Navigazione principale (mobile)" className="md:hidden">
            <ul className="flex flex-col gap-1 px-4 pb-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={linkClass}
                    end={item.to === '/'}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                  className="w-full rounded border border-slate-400 px-3 py-2 text-left text-sm hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  {theme === 'dark' ? '☀️ Tema chiaro' : '🌙 Tema scuro'}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="contenuto" className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
