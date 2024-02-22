import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from './components'; 

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <IconContext.Provider value={{style: {display: "inline-block", verticalAlign: "middle", fontSize: "20px"}}}>
        <ToastContainer/>
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);