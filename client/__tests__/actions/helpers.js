import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { changeErrState, changeSuccessState } from '../../src/actions/helpers';

import { API_ERR_STATE, API_SUCCESS_STATE }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Helper actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should dispatch API_ERR_STATE when there is an error', (done) => {
    const expectedActions = {
      type: API_ERR_STATE,
      payload: false,
    };
    const store = mockStore({});
    store.dispatch(changeErrState());
    expect(store.getActions()[0]).toEqual(expectedActions);
    done();
  });

  it('should dispatch API_SUCCESS_STATE when there is a successful api response', (done) => {
    const expectedActions = {
      type: API_SUCCESS_STATE,
      payload: false,
    };
    const store = mockStore({});
    store.dispatch(changeSuccessState());
    expect(store.getActions()[0]).toEqual(expectedActions);
    done();
  });
});
