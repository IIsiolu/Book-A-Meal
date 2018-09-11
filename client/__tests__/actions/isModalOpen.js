import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import isModalOpened from '../../src/actions/isModalOpened';

import { IS_MODAL_OPENED, MODAL_ID }
  from '../../src/actions/actionsTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Helper actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should dispatch IS_MODAL_OPENED', (done) => {
    const expectedActions = {
      type: IS_MODAL_OPENED,
      payload: false,
    };
    const modalId = {
      type: MODAL_ID,
      payload: 2,
    };
    const store = mockStore({});
    store.dispatch(isModalOpened(false, 2));
    expect(store.getActions()[0]).toEqual(expectedActions);
    expect(store.getActions()[1]).toEqual(modalId);
    done();
  });
});
