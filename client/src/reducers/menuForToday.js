import * as actionsTypes from '../actions/actionsTypes';
import { todayMenuState } from './initState';

const menuForToday = (state = todayMenuState, action) => {
  switch (action.type) {
    case actionsTypes.MENU_FOR_TODAY:
      return {
        ...state,
        menus: action.payload.data,
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
    default:
      return state;
  }
};

export default menuForToday;
