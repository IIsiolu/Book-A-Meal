import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { orderHistory, userOrders } from '../../src/actions';

import { GET_ORDER_HISTORY, USER_ORDERS }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const page = 1;
const limit = 1;
const offset = 1;

describe('Order History actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should return user order history', (done) => {
    const { orderSuccess } = mockData;
    const expectedActions = {
      type: USER_ORDERS,
      payload: orderSuccess,
    };
    const store = mockStore({});
    mock
      .onGet(`orders/userOrder?page=${page}&limit=${limit}&offset=${offset}`)
      .reply(201, orderSuccess);
    store.dispatch(userOrders(1, 1, 1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should return caterer order history', (done) => {
    const { orderSuccess } = mockData;
    const expectedActions = {
      type: GET_ORDER_HISTORY,
      payload: orderSuccess,
    };
    const store = mockStore({});
    mock
      .onGet(`orders/catererOrders?page=${page}&limit=${limit}&offset=${offset}`)
      .reply(201, orderSuccess);
    store.dispatch(orderHistory(1, 1, 1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });
});
