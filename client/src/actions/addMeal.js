import api from '../utils/api';
import * as actionTypes from './actionsTypes';

/**
 * @function isLoading
 * @param {boolean} bool
 * @returns {void}
 */
export const isLoading = bool => ({
  type: actionTypes.CREATING_MEAL,
  payload: bool,
});

// dispatch object
export const mealAdded = data => ({
  type: actionTypes.MEAL_ADDED,
  payload: data,
});

export const mealError = error => ({
  type: actionTypes.CREATE_MEAL_ERROR,
  payload: error,
});

export const mealSuccessState = bool => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_MEAL_SUCCESS_STATE,
    payload: bool,
  });
};

/**
 * @description an action to create a new meal
 * @function createMeal
 * @param {object} meal - meal data
 * @returns {object} data
 */
export const createMeal = meal => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api('meals', 'post', meal);
    const { data } = response;
    dispatch(mealAdded(data));
    return data;
  } catch (err) {
    dispatch(mealError(err));
    return err;
  }
};
