import api from '../utils/api';
import * as actionTypes from './actionsTypes';

const menuAdded = mealId => ({
  type: actionTypes.MENU_ADDED,
  payload: mealId,
});

const createdMenu = menu => ({
  type: actionTypes.MENU_CREATED,
  payload: menu,
});

const menuError = error => ({
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

  try {
    const response = await api('menu', 'post', params);
    const { data } = response;
    dispatch(createdMenu(data));
  } catch (err) {
    dispatch(menuError(err));
  }
};
