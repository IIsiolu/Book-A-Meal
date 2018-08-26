import { createdOrder } from '../../src/actions/order';
import {
  CHANGE_ORDER_SUC_STATE,
  CHANGE_ORDER_ERR_STATE, CLEAR_ORDER,
} from '../../src/actions/actionsTypes';
import order from '../../src/reducers/order';
import { orderState } from '../../src/reducers/initState';

describe('Order Reducer', () => {
  it(
    'should return Order initial state',
    () => {
      expect(order(undefined, {})).toEqual(orderState);
    },
  );

  it(
    'should set success to true when action type is ORDER_CREATED',
    () => {
      const action = createdOrder({ name: 'rice' });
      const newState = order(orderState, action);
      expect(newState.success).toBe(true);
      expect(newState.isError).toBe(false);
    },
  );

  it(
    'should change success state when action type is CHANGE_ORDER_SUC_STATE',
    () => {
      const action = {
        type: CHANGE_ORDER_SUC_STATE,
        payload: true,
      };
      const newState = order(orderState, action);
      expect(newState.success).toBe(true);
    },
  );

  it(
    'should change isError state when action type is CHANGE_ORDER_ERR_STATE',
    () => {
      const action = {
        type: CHANGE_ORDER_ERR_STATE,
        payload: true,
      };
      const newState = order(orderState, action);
      expect(newState.isError).toBe(true);
    },
  );

  it(
    'should clear all orders when action type is CLEAR_ORDER',
    () => {
      const action = {
        type: CLEAR_ORDER,
      };
      const newState = order(orderState, action);
      expect(newState.orders).toEqual([]);
    },
  );
});
