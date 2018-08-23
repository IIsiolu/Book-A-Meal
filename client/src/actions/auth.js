import jwt from 'jwt-decode';
import * as actionTypes from './actionsTypes';
import api from '../utils/api';

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

export const signupError = error => ({
  type: actionTypes.USER_SIGNUP_ERROR,
  error,
});

export const connectin = loading => ({
  type: actionTypes.LOADING,
  payload: loading,
});

/**
 * @description login user to the app
 * @param {object} credentials - valid user details
 * @param {object} history
 * @returns {object} response
 */
export const logIn = (credentials, history) => async (dispatch) => {
  dispatch(connectin(true));
  try {
    const response = await api('auth/login', 'post', credentials);
    const { token } = response;
    localStorage.setItem('myUserT', token);
    const userDecode = jwt(token);
    const pass = { ...userDecode, token };
    dispatch(userLoggedIn(pass));
    const navigate = userDecode.role === 'admin' ? '/dashboard' : '/';
    history.push(navigate);
    return response;
  } catch (err) {
    dispatch(loginError(err));
  }
};

export const signupState = bool => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_SIGN_UP,
    payload: bool,
  });
};

/**
 * @function signup
 * @description Signup user with valid credentials
 * @param {object} credentials - valid user details
 * @returns {object} response
 */
export const signup = credentials => async (dispatch) => {
  dispatch(connectin(true));
  try {
    const response = await api('auth/signup', 'post', credentials);
    dispatch(userSignup(response));
  } catch (err) {
    dispatch(signupError(err));
  }
};

/**
 * @function logout
 * @description logout user from the application
 * @param {object} credentials - valid user details
 * @returns {void}
 */
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(userLoggedIn({}));
};
