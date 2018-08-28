import * as actionsTypes from '../actions/actionsTypes';
import { menuState } from './initState';

const menu = (state = menuState, action) => {
  switch (action.type) {
    case actionsTypes.MENU_ADDED:
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };
    case actionsTypes.REMOVE_A_MENU_ITEM:
      return {
        ...state,
        menus: [...state.menus.filter(meal => meal.id !== action.payload)],
      };
    case actionsTypes.CLEAR_MENUS:
      return {
        ...state,
        menus: [],
      };
    case actionsTypes.MENU_CREATED:
      return {
        ...state,
        success: true,
        isError: false,
        createMenuError: null,
        createdMenus: [...state.createdMenus, action.payload],
      };
    case actionsTypes.MENU_ERROR:
      return {
        ...state,
        isError: true,
        success: false,
        createMenuError: action.payload,
      };
    case actionsTypes.CHANGE_MENU_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case actionsTypes.CHANGE_MENU_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default menu;
