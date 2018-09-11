import {
  MENU_FOR_TODAY, GET_MENU_ERROR, MENU_ADDED,
  REMOVE_A_MENU_ITEM, MENU_CREATED, MENU_ERROR, CHANGE_MENU_SUCCESS,
} from '../actions/actionsTypes';
import { menuState } from './initState';

const menu = (state = menuState, action) => {
  switch (action.type) {
    case MENU_FOR_TODAY:
      return {
        ...state,
        todayMenu: action.payload.menu,
        success: true,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case GET_MENU_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case MENU_ADDED:
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };
    case REMOVE_A_MENU_ITEM:
      return {
        ...state,
        menus: [...state.menus.filter(meal => meal.id !== action.payload)],
      };
    case MENU_CREATED:
      return {
        ...state,
        created: true,
        isError: false,
        menus: [],
        createMenuError: null,
      };
    case MENU_ERROR:
      return {
        ...state,
        isError: true,
        created: false,
        createMenuError: action.payload,
      };
    case CHANGE_MENU_SUCCESS:
      return {
        ...state,
        created: action.payload,
      };
    default:
      return state;
  }
};

export default menu;
