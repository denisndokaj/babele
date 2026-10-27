import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elemento #root non trovato nel documento.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
