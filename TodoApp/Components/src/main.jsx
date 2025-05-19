import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' //importation du composant principal à modifier si vous souhaitez tester localement 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
