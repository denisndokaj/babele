import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { db } from './db/db'
import { App } from './App'

describe('App', () => {
  beforeEach(async () => {
    await db.settings.clear()
  })

  it('senza onboarding completato, invita a cominciare', async () => {
    render(<App />)
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /benvenuto in babele/i })).toBeInTheDocument(),
    )
  })

  it('espone la navigazione principale verso le altre sezioni', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Vocabolario' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Impostazioni' })).toBeInTheDocument()
  })
})
