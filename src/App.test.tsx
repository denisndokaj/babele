import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('mostra la home con il piano del giorno di default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /home \/ piano del giorno/i })).toBeInTheDocument()
  })

  it('espone la navigazione principale verso le altre sezioni', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Vocabolario' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Impostazioni' })).toBeInTheDocument()
  })
})
