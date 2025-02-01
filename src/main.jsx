import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminAuthContextProvider from './context/AdminAuthContext'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthContextProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </AdminAuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
