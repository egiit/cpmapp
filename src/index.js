import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-tagsinput/dist/index.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js';
import App from './App';
import './index.css';
// import axios from 'axios';
// import axios from './components/axios/axios.js';
import { AuthProvider } from './components/auth/AuthProvider';

// axios.defaults.withCredentials = false;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
