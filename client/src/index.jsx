import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt from 'jwt-decode';
import App from './App';
import configureStore from './store';
import { setUser } from './actions/auth';
import verifyToken from './utils/verifyToken';

import '../../node_modules/semantic-ui-css/semantic.min.css';
import './static/css/index.css';

const store = configureStore();

if (verifyToken(localStorage.myUserT)) {
  const user = localStorage.getItem('myUserT');
  const decode = jwt(user);
  store.dispatch(setUser(decode));
}

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);
