import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/stores';

import Router from '@/Router';

import '@/assets/css/disable-scroll.css';
import '@/assets/css/disable-text-selection.css';

import '@/assets/css/custom-mui.css';

import '@/config/axios.config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
