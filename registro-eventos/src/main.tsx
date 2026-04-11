import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ParticipantesProvider } from './context/ParticipantesContext.tsx'
import Home from './Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticipantesProvider>
    <Home/>
    </ParticipantesProvider>
  </StrictMode>,
)
