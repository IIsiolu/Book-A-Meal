import * as actionTypes from './actionsTypes';
import axios from 'axios';
import api from '../api';

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

export const logIn = credentials => (dispatch) => {
  console.log({
    credentials,
  });
  dispatch(connectin(true));
  axios.post('/api/v1/auth/login', credentials)
    .then((res) => {
      dispatch(userLoggedIn(res));
    })
    .catch((error) => {
      console.log({
        err: 'error in login',
        error: error.response,
      });
      const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(userError(myError));
    });
};
