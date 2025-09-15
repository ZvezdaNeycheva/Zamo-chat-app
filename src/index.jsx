import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from './AppContext';
import { CallProvider } from './CallContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <CallProvider>
        <App />
      </CallProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// reportWebVitals();
