import * as actionTypes from './actionsTypes';
import api from '../utils/api';

export const getMenu = menu => ({
  type: actionTypes.MENU_FOR_TODAY,
  payload: menu,
});

export const getMenuError = menu => ({
  type: actionTypes.GET_MENU_ERROR,
  payload: menu,
});

/**
 * @description gets menu for the day
 * @function menuForToday
 * @param {string} date
 * @returns {void}
 */
export const menuForToday = date => async (dispatch) => {
  try {
    const response = await api(`menu?date=${date}`);
    const { data } = response;
    dispatch(getMenu(data));
  } catch (err) {
    dispatch(getMenuError(err));
  }
};

