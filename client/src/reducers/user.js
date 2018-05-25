import * as actionsTypes from '../actions/actionsTypes';
// loading state
// most suitable things to have in a token
const initialState = {
  loading: false,
  error: null,
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
        error: null,
        user: action.payload,
      };
    case actionsTypes.USER_LOGGED_IN:
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false,
      };
    case actionsTypes.USER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
