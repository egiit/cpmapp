import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import './index.css';

import { AuthProvider } from './components/auth/AuthProvider';

// axios.defaults.withCredentials = false;

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
