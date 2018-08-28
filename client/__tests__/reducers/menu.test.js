import { createdOrder } from '../../src/actions/order';
import {
  MENU_CREATED, CLEAR_MENUS, MENU_ADDED,
  MENU_ERROR, CHANGE_MENU_ERROR, CHANGE_MENU_SUCCESS,
} from '../../src/actions/actionsTypes';
import menu from '../../src/reducers/menu';
import { menuState } from '../../src/reducers/initState';

describe('Order Reducer', () => {
  it(
    'should return Order initial state',
    () => {
      expect(menu(undefined, {})).toEqual(menuState);
    },
  );

  it(
    'should set success to true when action type is MENU_CREATED',
    () => {
      const action = {
        type: MENU_CREATED,
      };
      const newState = menu(menuState, action);
      expect(newState.success).toBe(true);
      expect(newState.isError).toBe(false);
    },
  );

  it(
    'should set isError to true when action type is MENU_ERROR',
    () => {
      const action = {
        type: MENU_ERROR,
      };
      const newState = menu(menuState, action);
      expect(newState.success).toBe(false);
      expect(newState.isError).toBe(true);
    },
  );

  it(
    'should change isError state when action type is CHANGE_MENU_ERROR',
    () => {
      const action = {
        type: CHANGE_MENU_ERROR,
        payload: false,
      };
      const newState = menu(menuState, action);
      expect(newState.isError).toBe(false);
    },
  );

  it(
    'should change success state when action type is CHANGE_MENU_SUCCESS',
    () => {
      const action = {
        type: CHANGE_MENU_SUCCESS,
        payload: false,
      };
      const newState = menu(menuState, action);
      expect(newState.success).toBe(false);
    },
  );

  it(
    'should clear the menu state when action type is CLEAR_MENUS',
    () => {
      const action = {
        type: CLEAR_MENUS,
      };
      const newState = menu(menuState, action);
      expect(newState.menus).toEqual([]);
    },
  );

  it(
    'should add meal to menu when action type is MENU_ADDED',
    () => {
      const action = {
        type: MENU_ADDED,
        payload: { name: 'rice' },
      };
      const newState = menu(menuState, action);
      expect(newState.menus).toEqual([{ name: 'rice' }]);
    },
  );
});
