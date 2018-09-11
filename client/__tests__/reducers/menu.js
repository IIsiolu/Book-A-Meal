import {
  MENU_CREATED, CLEAR_MENUS, MENU_ADDED, MENU_FOR_TODAY, REMOVE_A_MENU_ITEM,
  MENU_ERROR, CHANGE_MENU_ERROR, CHANGE_MENU_SUCCESS, GET_MENU_ERROR,
} from '../../src/actions/actionsTypes';
import menu from '../../src/reducers/menu';
import { menuState } from '../../src/reducers/initState';

describe('Menu Reducer', () => {
  it(
    'should return Menu initial state',
    () => {
      expect(menu(undefined, {})).toEqual(menuState);
    },
  );

  it(
    'should set created to true when action type is MENU_CREATED',
    () => {
      const action = {
        type: MENU_CREATED,
      };
      const newState = menu(menuState, action);
      expect(newState.created).toBe(true);
      expect(newState.isError).toBe(false);
    },
  );

  it(
    'should set success to true when action type is MENU_FOR_TODAY',
    () => {
      const action = {
        type: MENU_FOR_TODAY,
        payload: {
          menu: [{ name: 'rice' }, { name: 'beans' }],
          pagination: {
            pagination: { data: 1 },
          },
        },
      };
      const newState = menu(menuState, action);
      expect(newState.success).toBe(true);
      expect(newState.todayMenu.length).toBeGreaterThan(1);
    },
  );

  it(
    'should set isError to true when action type is MENU_ERROR',
    () => {
      const action = {
        type: MENU_ERROR,
      };
      const newState = menu(menuState, action);
      expect(newState.created).toBe(false);
      expect(newState.isError).toBe(true);
    },
  );

  it(
    'should set success to false when action type is GET_MENU_ERROR',
    () => {
      const action = {
        type: GET_MENU_ERROR,
        payload: 'error',
      };
      const newState = menu(menuState, action);
      expect(newState.success).toBe(false);
      expect(newState.error).toEqual('error');
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
      expect(newState.created).toBe(false);
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
        payload: { id: 1, name: 'rice' },
      };
      const newState = menu(menuState, action);
      expect(newState.menus).toEqual([{ id: 1, name: 'rice' }]);
    },
  );

  it(
    'should remove a meal when action type is REMOVE_A_MENU_ITEM',
    () => {
      const action = {
        type: REMOVE_A_MENU_ITEM,
        payload: { id: 1, name: 'beans' },
      };
      const newState = menu(menuState, action);
      expect(newState.menus).toEqual([]);
    },
  );
});
