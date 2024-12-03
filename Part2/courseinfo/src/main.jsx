import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let counter=1;


createRoot(document.getElementById('root')).render(
    <App  counter={counter}/>
)




