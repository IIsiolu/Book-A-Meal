import * as actionTypes from './actionsTypes';
import api from '../utils/api';

export const isLoading = state => ({
  type: actionTypes.FETCHING_MEAL,
  payload: state,
});

export const mealFetched = data => ({
  type: actionTypes.MEAL_FETCHED,
  payload: data,
});

export const mealFetchError = error => ({
  type: actionTypes.FETCH_MEAL_ERROR,
  payload: error,
});

/**
 * @function fetchMeals
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const fetchMeals = (page, limit, offset) => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api(`meals?page=${page}
    &limit=${limit}&offset=${offset}`);
    dispatch(mealFetched(response));
  } catch (err) {
    dispatch(mealFetchError(err));
  }
};
