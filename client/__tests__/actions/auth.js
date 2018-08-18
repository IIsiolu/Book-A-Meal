import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jwt-decode';
import { signup, logIn } from '../../src/actions';

import { USER_SIGN_UP, USER_SIGNUP_ERROR, USER_LOGGED_IN }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  // beforeEach(() => moxios.install(axios));
  // afterEach(() => moxios.uninstall(axios));
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
      expect(store.getActions()[1]).toEqual(expectedActions);
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
        user: jwt(loginResponse.token),
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
});
