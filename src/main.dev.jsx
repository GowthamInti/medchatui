import React from 'react'
import ReactDOM from 'react-dom/client'
import DevApp from './App.dev.js'
import './index.css'

// Create root and render development app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DevApp />
  </React.StrictMode>
);

console.log('🚀 Running in DEVELOPMENT mode - Authentication bypassed');
console.log('📱 All UI components are accessible without login');