import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.tsx';
import { TaskProvider } from './context/TasxContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
)
