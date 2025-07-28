import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'
import { router } from './routes/routes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
