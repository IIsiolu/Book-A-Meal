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
 * @param {string} role
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const fetchMeals = (role, page, limit, offset) => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    let response;
    if (role === 'super-admin') {
      response = await api(`meals?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    } else {
      response = await api(`meals/caterer?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    }
    dispatch(mealFetched(response));
  } catch (err) {
    dispatch(mealFetchError(err));
  }
};
