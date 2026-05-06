import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ParticipantesProvider } from './context/ParticipantesContext.tsx'
import Home from './Home.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ParticipantesProvider>
        <App/>
      </ParticipantesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
