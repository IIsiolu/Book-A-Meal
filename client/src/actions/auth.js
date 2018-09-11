import jwt from 'jwt-decode';
import {
  LOGOUT, LOGIN_ERROR, USER_LOGGED_IN, SET_CURRENT_USER,
  USER_SIGN_UP, USER_SIGNUP_ERROR, LOADING, CHANGE_SIGN_UP,
} from './actionsTypes';
import api from '../utils/api';

export const userSignup = user => ({
  type: USER_SIGN_UP,
  payload: user,
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user,
});

export const setUser = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const signupError = error => ({
  type: USER_SIGNUP_ERROR,
  error,
});

export const connecting = loading => ({
  type: LOADING,
  payload: loading,
});

/**
 * @description login user to the app
 * @param {object} credentials - valid user details
 * @param {object} history
 * @returns {object} response
 */
export const logIn = (credentials, history) => async (dispatch) => {
  dispatch(connecting(true));
  try {
    const response = await api('auth/login', 'post', credentials);
    const { token } = response;
    localStorage.setItem('myUserToken', token);
    const userDecode = jwt(token);
    const userInfo = { ...userDecode, token };
    dispatch(userLoggedIn(userInfo));
    const navigate = userDecode.role === 'caterer' ? '/dashboard' : '/';
    history.push(navigate);
    return response;
  } catch (err) {
    dispatch(loginError(err));
  }
};

/**
 * @function signup
 * @description Signup user with valid credentials
 * @param {object} credentials - valid user details
 * @returns {object} response
 */
export const signup = credentials => async (dispatch) => {
  dispatch(connecting(true));
  try {
    const response = await api('auth/signup', 'post', credentials);
    const { token } = response;
    localStorage.setItem('myUserToken', token);
    const userDecode = jwt(token);
    const userInfo = { ...userDecode, token };
    dispatch(userLoggedIn(userInfo));
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
  try {
    localStorage.clear();
    dispatch(userLoggedIn({}));
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    return err;
  }
};
