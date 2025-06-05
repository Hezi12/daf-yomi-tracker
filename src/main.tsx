import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loaded successfully');
console.log('React version:', React.version);

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('Root element not found!');
} 