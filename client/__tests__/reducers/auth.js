import {
  USER_SIGN_UP, USER_SIGNUP_ERROR,
  USER_LOGGED_IN, LOGIN_ERROR, SET_CURRENT_USER, LOADING,
} from '../../src/actions/actionsTypes';
import { logout } from '../../src/actions';
import user from '../../src/reducers/user';
import { userState } from '../../src/reducers/initState';

describe('Auth Reducer', () => {
  it(
    'should return signUp initial state',
    () => {
      expect(user(undefined, {})).toEqual(userState);
    },
  );

  it(
    'should set loading to true when action type is LOADING',
    () => {
      const action = {
        type: LOADING,
      };
      const newState = user(userState, action);
      expect(newState.loading).toBe(true);
    },
  );

  it(
    'should set signedUp to true when action type is USER_SIGN_UP',
    () => {
      const action = {
        type: USER_SIGN_UP,
      };
      const newState = user(userState, action);
      expect(newState.signedUp).toBe(true);
    },
  );

  it(
    'should set signedUp to false and signUpError to true ' +
     'when action type is USER_ERROR',
    () => {
      const action = {
        type: USER_SIGNUP_ERROR,
      };
      const newState = user(userState, action);
      expect(newState.signedUp).toBe(false);
      expect(newState.signUpError).toBe(true);
    },
  );
  it(
    'should return signIn initial state',
    () => {
      expect(user(undefined, {})).toEqual(userState);
    },
  );
  it(
    'should set loginSuccess to true when action type is USER_SIGN_UP',
    () => {
      const action = {
        type: USER_LOGGED_IN,
      };
      const newState = user(userState, action);
      expect(newState.loginSuccess).toBe(true);
    },
  );
  it(
    'should set loginSuccess to false ',
    () => {
      const action = {
        type: LOGIN_ERROR,
      };
      const newState = user(userState, action);
      expect(newState.loginSuccess).toBe(false);
    },
  );

  it(
    'sets success to true when action type is SET_CURRENT_USER' +
    'user data to store',
    () => {
      const action = {
        type: SET_CURRENT_USER,
        payload: {
          token: 'token',
        },
      };
      const newState = user(userState, action);
      expect(newState.success).toBe(true);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user.token).toBe('token');
    },
  );
});
