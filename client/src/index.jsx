import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt from 'jwt-decode';
import App from './App';
import configureStore from './store';
import { setUser } from './actions/user';
import verifyToken from './utils/verifyToken';

import '../../node_modules/semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './static/css/index.css';

// returns store object passed into provider
const store = configureStore();

// verifies token in local storage
if (verifyToken(localStorage.myUserToken)) {
  const user = localStorage.getItem('myUserToken');
  const decode = jwt(user);
  store.dispatch(setUser(decode));
}

/**
 * @summary method to render a React element into the DOM in the
 *  supplied container and return a reference to the component
 * @param {JSX} BrowserRouter - uses html5 history api to keep UI in sync with
 * URL
 * @param {function}
 */
ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);
