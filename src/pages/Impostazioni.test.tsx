import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { db } from '../db/db'
import { getSessionSettings, saveOnboardingProfile } from '../settings/settings'
import { Impostazioni } from './Impostazioni'

describe('Impostazioni', () => {
  beforeEach(async () => {
    await db.settings.clear()
  })

  it('invita a completare l\'onboarding se non è ancora stato fatto', async () => {
    render(
      <MemoryRouter>
        <Impostazioni />
      </MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByText(/comincia da qui/i)).toBeInTheDocument())
  })

  it('mostra le lingue attive e il livello una volta completato l\'onboarding', async () => {
    await saveOnboardingProfile({
      completed: true,
      activeLanguages: ['fr', 'de'],
      priorityLanguage: 'fr',
      levels: { fr: 'A2', de: 'A1' },
    })

    render(
      <MemoryRouter>
        <Impostazioni />
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.getByText(/francese/i)).toBeInTheDocument())
    expect(screen.getByText(/prioritaria/i)).toBeInTheDocument()
    expect(screen.getByText(/tedesco/i)).toBeInTheDocument()
  })

  it('aggiorna e persiste il budget giornaliero quando lo si cambia', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Impostazioni />
      </MemoryRouter>,
    )

    const select = await screen.findByLabelText(/minuti al giorno/i)
    await user.selectOptions(select, '40')

    await waitFor(async () => {
      expect(await getSessionSettings()).toEqual({ dailyBudgetMinutes: 40, dailyNewCardLimit: 10 })
    })
  })
})
