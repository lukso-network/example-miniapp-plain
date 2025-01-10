import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GridProvider } from './context/GridProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GridProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GridProvider>
  </StrictMode>,
)
