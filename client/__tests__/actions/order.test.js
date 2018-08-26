import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { requestForOrder } from '../../src/actions';

import { createdOrder, orderError }
  from '../../src/actions/order';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Request Order actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('Create a new order with valid inputs', (done) => {
    const { userOrderSuccess, userOrder } = mockData;
    const expectedActions = createdOrder(userOrderSuccess.data);
    const store = mockStore({});
    mock
      .onPost('orders', userOrder)
      .reply(201, userOrderSuccess);
    store.dispatch(requestForOrder(userOrder)).then(() => {
      expect(store.getActions()).toEqual([expectedActions]);
      done();
    });
  });

  it('should fail to create an order when there is invalid mealId', (done) => {
    const { userOrderError, userOrder2 } = mockData;
    const expectedActions = orderError(userOrderError.message);
    const store = mockStore({});
    mock
      .onPost('orders', userOrder2)
      .reply(400, userOrderError);
    store.dispatch(requestForOrder(userOrder2)).then(() => {
      expect(store.getActions()).toEqual([expectedActions]);
      done();
    });
  });

  it('should fail to create an order when' +
   'there is invalid quantity', (done) => {
    const { userOrderError, userOrder3 } = mockData;
    const expectedActions = orderError(userOrderError.message);
    const store = mockStore({});
    mock
      .onPost('orders', userOrder3)
      .reply(400, userOrderError);
    store.dispatch(requestForOrder(userOrder3)).then(() => {
      expect(store.getActions()).toEqual([expectedActions]);
      done();
    });
  });
});

