import * as actionTypes from './actionsTypes';
import api from '../utils/api';

const isLoading = bool => ({
  type: actionTypes.UPDATING_MEAL,
  payload: bool,
});

const mealUpdated = meal => ({
  type: actionTypes.MEAL_UPDATED,
  payload: meal,
});

const updateMealFetched = meal => ({
  type: actionTypes.UPDATE_FETCH_MEAL,
  payload: meal,
});

const mealError = error => ({
  type: actionTypes.MEAL_UPDATE_ERROR,
  payload: error,
});

export const changeMealSuccess = bool => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_SUCCESS,
    payload: bool,
  });
};

export const changeMealError = bool => (dispatch) => {
  dispatch({
    type: actionTypes.IS_MEAL_ERROR,
    payload: bool,
  });
};

/**
 * @description updates a meal
 * @function updateMeal
 * @param {object} meal
 * @returns {object} response
 */
export const updateMeal = meal => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api(`meals/${meal.id}`, 'put', meal);
    dispatch(updateMealFetched(meal));
    dispatch(mealUpdated(meal));
    return response;
  } catch (err) {
    dispatch(mealError(err));
    return err;
  }
};

