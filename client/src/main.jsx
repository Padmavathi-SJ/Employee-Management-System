import React from 'react'; // Add this line
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import authContext from './context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 <authContext>
  <App />
 </authContext>
);

