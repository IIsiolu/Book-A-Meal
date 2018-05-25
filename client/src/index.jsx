import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt from 'jwt-decode';
import App from './App';
import configureStore from './store';
import { userLoggedIn } from './actions/auth';

const store = configureStore();

if (localStorage.myUserT) {
  const user = localStorage.getItem('myUserT');
  let decode = jwt(user);
  const pass = { ...decode, token: user };
  store.dispatch(userLoggedIn(pass));
  console.log(pass);
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <Route component={App} />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'),
);
