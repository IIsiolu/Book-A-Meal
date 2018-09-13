import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SocketIO as socketIO } from 'mock-socket';
import { requestForOrder } from '../../src/actions';

import { ORDER_CREATED, API_ERR_RESPONSE }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Order actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should request for a new order', (done) => {
    const { bisiOrder, mealOrderSuccess } = mockData;
    const expectedActions = {
      type: ORDER_CREATED,
      payload: mealOrderSuccess.order,
    };
    const store = mockStore({});
    mock
      .onPost('orders', bisiOrder)
      .reply(201, mealOrderSuccess);
    store.dispatch(requestForOrder(bisiOrder.order.meals, bisiOrder.order.address, socketIO)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch API_ERR_RESPONSE when no address is provided', (done) => {
    const { bisiOrder, orderFailure } = mockData;
    const expectedActions = {
      type: API_ERR_RESPONSE,
      payload: {
        header: 'Order Error',
        message: 'Order could not be requested',
        type: 'error',
      },
    };
    const store = mockStore({});
    mock
      .onPost('orders', bisiOrder.order.meals)
      .reply(400, orderFailure);
    store.dispatch(requestForOrder(bisiOrder.order.meals)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });
});
