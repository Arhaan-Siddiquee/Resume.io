// Import React and ReactDOM for rendering
import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the change here
import './index.css'; // Import your index.css (which includes TailwindCSS)

// Import the main App component
import App from './App';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
