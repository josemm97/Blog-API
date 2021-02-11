/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

// eslint-disable-next-line react/jsx-filename-extension
ReactDom.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
