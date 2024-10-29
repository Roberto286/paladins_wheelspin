import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactNotifications />
    <App />
  </React.StrictMode>
);
