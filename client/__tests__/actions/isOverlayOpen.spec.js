import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import isOverlayOpened from '../../src/actions/overlayModal';

import { IS_OVERLAY_OPENED, IS_OVERLAY_ID }
  from '../../src/actions/actionsTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Overlay actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should dispatch IS_OVERLAY_OPENED', (done) => {
    const expectedActions = {
      type: IS_OVERLAY_OPENED,
      payload: false,
    };
    const modalId = {
      type: IS_OVERLAY_ID,
      payload: 2,
    };
    const store = mockStore({});
    store.dispatch(isOverlayOpened(false, 2));
    expect(store.getActions()[0]).toEqual(expectedActions);
    expect(store.getActions()[1]).toEqual(modalId);
    done();
  });
});
