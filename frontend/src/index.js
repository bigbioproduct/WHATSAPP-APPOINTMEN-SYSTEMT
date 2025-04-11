import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create root and render the App component inside StrictMode
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Performance measurement
// To enable performance tracking, pass a callback to reportWebVitals
// Example: reportWebVitals(console.log)
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
