import * as actionsTypes from '../actions/actionsTypes';
import { menuState } from './initState';

const menu = (state = menuState, action) => {
  switch (action.type) {
    case actionsTypes.MENU_FOR_TODAY:
      return {
        ...state,
        todayMenu: action.payload.menu,
        success: true,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case actionsTypes.GET_MENU_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
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
        created: true,
        isError: false,
        createMenuError: null,
      };
    case actionsTypes.MENU_ERROR:
      return {
        ...state,
        isError: true,
        created: false,
        createMenuError: action.payload,
      };
    case actionsTypes.CHANGE_MENU_SUCCESS:
      return {
        ...state,
        created: action.payload,
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
