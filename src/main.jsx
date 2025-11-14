import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CoffeeProvider } from './pages/CoffeeContext.jsx'

createRoot(document.getElementById('root')).render(
  <CoffeeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CoffeeProvider>
)
