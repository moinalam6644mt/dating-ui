import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Components/ContextApi/AuthProvider';
import { LanguageProvider } from './Components/Layout/LayoutContext/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));

root.render(
  <AuthProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </AuthProvider>
);

reportWebVitals();
