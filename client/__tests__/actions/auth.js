import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jwt-decode';
import { signup, logIn, logout } from '../../src/actions';

import { USER_SIGN_UP, USER_SIGNUP_ERROR, USER_LOGGED_IN, LOGIN_ERROR }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new user when signup is successful', (done) => {
    const { authResponse, signUpData } = mockData;
    const expectedActions = {
      type: USER_SIGN_UP,
      payload: authResponse,
    };
    const store = mockStore({});
    mock
      .onPost('auth/signup', signUpData)
      .reply(201, authResponse);
    store.dispatch(signup(signUpData)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it(
    ' should dispatch LOGIN_ERROR when user invalid password',
    (done) => {
      const { invalidPassRes, invalidSignin } = mockData;
      const expectedActions = {
        type: LOGIN_ERROR,
        payload: invalidPassRes,
      };
      const store = mockStore({});
      mock
        .onPost('auth/login', invalidSignin)
        .reply(401, invalidPassRes);
      store.dispatch(logIn(invalidSignin))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    },
  );

  it('creates a caterer when role is set as "caterer"', (done) => {
    const { authResponse, catererSignup } = mockData;
    const expectedActions = {
      type: USER_SIGN_UP,
      payload: authResponse,
    };
    const store = mockStore({});
    mock
      .onPost('auth/signup', catererSignup)
      .reply(201, authResponse);
    store.dispatch(signup(catererSignup)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it(
    'should dispatch USER_SIGNUP_ERROR action when a user ' +
  'provides a username that already exists on the application',
    (done) => {
      const { signupFailure, signUpData } = mockData;
      const expectedActions = {
        type: USER_SIGNUP_ERROR,
        error: signupFailure.message,
      };
      const store = mockStore({});
      mock
        .onPost('auth/signup', signUpData)
        .reply(409, signupFailure);
      store.dispatch(signup(signUpData))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
          done();
        });
    },
  );

  it(
    'creates SET_CURRENT_USER when login action is successful',
    (done) => {
      const { loginResponse, signinData } = mockData;
      const expectedActions = {
        type: USER_LOGGED_IN,
        payload: jwt(loginResponse.token),
      };
      const store = mockStore({});
      mock
        .onPost('auth/login', signinData)
        .reply(200, loginResponse);
      store.dispatch(logIn(signinData))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    },
  );

  it(
    ' should dispatch LOGIN_ERROR when user does not exist',
    (done) => {
      const { notExistResponse, invalidUser } = mockData;
      const expectedActions = {
        type: LOGIN_ERROR,
        payload: notExistResponse,
      };
      const store = mockStore({});
      mock
        .onPost('auth/login', invalidUser)
        .reply(404, notExistResponse);
      store.dispatch(logIn(invalidUser))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    },
  );

  it(
    ' should dispatch LOGIN_ERROR when user invalid password',
    (done) => {
      const { invalidPassRes, invalidSignin } = mockData;
      const expectedActions = {
        type: LOGIN_ERROR,
        payload: invalidPassRes,
      };
      const store = mockStore({});
      mock
        .onPost('auth/login', invalidSignin)
        .reply(401, invalidPassRes);
      store.dispatch(logIn(invalidSignin))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    },
  );

  it(
    'should dispatch USER_LOGGED_IN and also clear the token' +
     ' when a user logs out',
    (done) => {
      const expectedActions = {
        type: USER_LOGGED_IN,
        payload: {},
      };
      const store = mockStore({});
      store.dispatch(logout());
      expect(store.getActions()).toEqual([expectedActions]);
      done();
    },
  );
});
