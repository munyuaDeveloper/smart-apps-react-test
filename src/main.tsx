import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes.js'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes}>
       <App />
    </RouterProvider>
  </StrictMode>,
)
