import api from '../utils/api';
import * as actionTypes from './actionsTypes';
import { isLoading } from './meal';

const menuAdded = mealId => ({
  type: actionTypes.MENU_ADDED,
  payload: mealId,
});

const menuSuccess = message => ({
  type: actionTypes.API_SUCCESS_RESPONSE,
  payload: message,
});

export const getMenu = menu => ({
  type: actionTypes.MENU_FOR_TODAY,
  payload: menu,
});

export const getMenuError = menu => ({
  type: actionTypes.GET_MENU_ERROR,
  payload: menu,
});

export const createdMenu = menu => ({
  type: actionTypes.MENU_CREATED,
  payload: menu,
});

export const menuError = error => ({
  type: actionTypes.MENU_ERROR,
  payload: error,
});

const remove = meal => ({
  type: actionTypes.REMOVE_A_MENU_ITEM,
  payload: meal,
});

export const addToMenu = meal => (dispatch) => {
  dispatch(menuAdded(meal));
};

export const clearMenu = () => dispatch => (
  dispatch({
    type: actionTypes.CLEAR_MENUS,
  })
);

export const removeMeal = mealId => (dispatch) => {
  dispatch(remove(mealId));
};

export const changeMErrorState = bool => dispatch => (
  dispatch({
    type: actionTypes.CHANGE_MENU_ERROR,
    payload: bool,
  })
);

export const changeMSuccessState = bool => dispatch => (
  dispatch({
    type: actionTypes.CHANGE_MENU_SUCCESS,
    payload: bool,
  })
);

/**
 * @description creates a new menu
 * @function createdMenu
 * @param {object} menus
 * @param {string} date
 * @returns {void}
 */
export const createMenu = (menus, date) => async (dispatch) => {
  const newArray = menus.map(meal => meal.id);
  const params = {
    mealId: newArray,
    date,
  };
  dispatch(isLoading(true));
  try {
    const response = await api('menu', 'post', params);
    dispatch(isLoading(false));
    dispatch(menuSuccess({
      header: 'Menu Created',
      message: 'Your menu has been created successfully!',
      type: 'success',
    }));
    dispatch(createdMenu(response));
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(menuError(err));
  }
};

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
  dispatch(isLoading(true));
  try {
    const response = await api(`menu?date=${date}&page=${page}&limit=${limit}&offset=${offset}`, 'get');
    dispatch(isLoading(false));
    dispatch(getMenu(response));
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(getMenuError(err));
  }
};
