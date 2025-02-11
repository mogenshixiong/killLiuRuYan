import { StrictMode } from 'react'
import '@/styles/tailwind.css'
import '@/styles/index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { initStores } from '@/stores/init'

initStores().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
})
