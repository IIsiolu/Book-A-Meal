import axios from 'axios';
import jwt from 'jwt-decode';
import * as actionTypes from './actionsTypes';

export const userSignup = user => ({
  type: actionTypes.USER_SIGN_UP,
  payload: user,
})
export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  user,
});

export const userError = error => ({
  type: actionTypes.USER_ERROR,
  error,
});

export const connectin = loading => ({
  type: actionTypes.LOADING,
});

export const signup = (credentials, history) => (dispatch) => {
  console.log({
    credentials,
  });
  dispatch(connectin(true));
  axios.post('/api/v1/auth/signup', credentials)
    .then((res) => {
      const { data } = res;
      dispatch(userSignup(data));
      history.push('/login');
    })
    .catch((error) => {
      if (error.response) {
        console.log({
          err: 'error in signup',
          error: error.response,
        });
        const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(userError(myError));
      }
    });
};

export const logIn = (credentials, history) => (dispatch) => {
  console.log({
    credentials,
  });
  dispatch(connectin(true));
  axios.post('/api/v1/auth/login', credentials)
    .then((res) => {
      const jwtoken = res.data.token;
      localStorage.setItem('myUserT', jwtoken);
      const userDecode = jwt(jwtoken);
      const pass = { ...userDecode, token: jwtoken };
      dispatch(userLoggedIn(pass));
      const navigate = userDecode.role === 'admin' ? '/dashboard' : '/';
      history.push(navigate);
    })
    .catch((error) => {
      if (error.response) {
        console.log({
          err: 'error in login',
          error: error.response,
        });
        const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(userError(myError));
      }
    });
};

export const logout = history => (dispatch) => {
  localStorage.clear();
  history.push('/');
  dispatch(userLoggedIn({}));
};
