import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  AdminAuthContextProvider  from './context/AdminAuthConext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminAuthContextProvider>
      <App />
    </AdminAuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
