import axios from 'axios';
import jwt from 'jwt-decode';
import * as actionTypes from './actionsTypes';
import instance from '../utils/instance';

export const userSignup = user => ({
  type: actionTypes.USER_SIGN_UP,
  payload: user,
});
export const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  payload: error,
});
export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  payload: user,
});
export const setUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user,
});
export const userError = error => ({
  type: actionTypes.USER_ERROR,
  error,
});

export const connectin = loading => ({
  type: actionTypes.LOADING,
  payload: loading,
});

export const logIn = (credentials, history) => (dispatch) => {
  // console.log({
  //   credentials,
  // });
  dispatch(connectin(true));

  return instance.post('auth/login', credentials)
    .then((res) => {
      console.log({
        res,
      });
      const { token } = res.data;
      // set key to token
      localStorage.setItem('myUserT', token);

      // setAuthorizationToken(token);

      const userDecode = jwt(token);
      const pass = { ...userDecode, token };
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
        dispatch(loginError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(loginError(myError));
      }
    });
};

export const signupState = bool => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_SIGN_UP,
    payload: bool,
  });
};

export const signup = (credentials, history) => (dispatch) => {
  dispatch(connectin(true));
  return instance.post('auth/signup', credentials)
    .then((res) => {
      const { data } = res;
      const newData = {
        email: credentials.email,
        password: credentials.password,
      };
      dispatch(userSignup(data));
      // history.push('/login');
    })
    .catch((error) => {
      if (error.response) {
        const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(userError(myError));
      }
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(userLoggedIn({}));
};
