import * as actionsTypes from '../actions/actionsTypes';
import { menuState } from './initState';

const menu = (state = menuState, action) => {
  switch (action.type) {
    case actionsTypes.MENU_ADDED:
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };
    case actionsTypes.REMOVE_A_MEAL:
      return {
        ...state,
        error: action.payload,
      };
    case actionsTypes.REMOVE_A_MENU_ITEM:
      return {
        ...state,
        menus: [...state.menus.filter(meal => meal.id !== action.payload)],
      };
    case actionsTypes.MENU_CREATED:
      return {
        ...state,
        createdMenus: [...state.createdMenus, action.payload],
      };
    case actionsTypes.MENU_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default menu;
