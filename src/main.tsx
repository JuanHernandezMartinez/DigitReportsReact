import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);