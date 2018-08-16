import isEmpty from 'lodash/isEmpty';
import * as actionsTypes from '../actions/actionsTypes';
// loading state
// most suitable things to have in a token
// create a general initial state
// change loading to isloading
const initialState = {
  loading: false,
  success: false,
  error: null,
  loginError: null,
  loginSuccess: false,
  isAuthenticated: false,
  signedUp: false,
  user: {
    role: null,
  },
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.USER_SIGN_UP:
      return {
        ...state,
        loading: false,
        signedUp: true,
        error: null,
        user: action.payload,
      };
    case actionsTypes.CHANGE_SIGN_UP:
      return {
        ...state,
        signedUp: action.payload,
      };
    case actionsTypes.USER_LOGGED_IN:
      return {
        ...state,
        loginSuccess: !isEmpty(action.payload),
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loginError: null,
        loading: false,
      };
    case actionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case actionsTypes.USER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionsTypes.LOGIN_ERROR:
      return {
        ...state,
        loginSuccess: false,
        loginError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
