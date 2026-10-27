import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { Home } from './pages/Home'
import { Vocabolario } from './pages/Vocabolario'
import { Grammatica } from './pages/Grammatica'
import { AscoltaGuarda } from './pages/AscoltaGuarda'
import { Musica } from './pages/Musica'
import { Leggi } from './pages/Leggi'
import { Pronuncia } from './pages/Pronuncia'
import { Scrivi } from './pages/Scrivi'
import { Conversa } from './pages/Conversa'
import { Confusioni } from './pages/Confusioni'
import { Statistiche } from './pages/Statistiche'
import { Impostazioni } from './pages/Impostazioni'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/vocabolario" element={<Vocabolario />} />
          <Route path="/grammatica" element={<Grammatica />} />
          <Route path="/ascolta-guarda" element={<AscoltaGuarda />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/leggi" element={<Leggi />} />
          <Route path="/pronuncia" element={<Pronuncia />} />
          <Route path="/scrivi" element={<Scrivi />} />
          <Route path="/conversa" element={<Conversa />} />
          <Route path="/confusioni" element={<Confusioni />} />
          <Route path="/statistiche" element={<Statistiche />} />
          <Route path="/impostazioni" element={<Impostazioni />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
