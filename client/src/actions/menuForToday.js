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
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const menuForToday = (date, page, limit, offset) => async (dispatch) => {
  try {
    const response = await api(`menu?date=${date}&page=${page}
    &limit=${limit}&offset=${offset}`, 'get');
    dispatch(getMenu(response));
  } catch (err) {
    dispatch(getMenuError(err));
  }
};

