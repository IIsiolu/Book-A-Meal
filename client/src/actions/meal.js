import api from '../utils/api';
import {
  START_LOADER, MEAL_ADDED, MEAL_FETCHED, MEAL_UPDATED,
  UPDATE_FETCH_MEAL, DELETE_FETCH_MEAL,
  CREATING_MEAL, FETCH_MEAL_ERROR,
  ADD_MEAL_SUCCESS_STATE,
  API_ERR_RESPONSE, API_SUCCESS_RESPONSE,
  CREATE_MEAL_ERROR,
} from './actionsTypes';

/**
 * @function isLoading
 * @param {boolean} bool
 * @returns {object} action
 */
export const isLoading = bool => ({
  type: START_LOADER,
  payload: bool,
});

export const creatingMeal = bool => ({
  type: CREATING_MEAL,
  payload: bool,
});

export const mealSuccessState = bool => (dispatch) => {
  dispatch({
    type: ADD_MEAL_SUCCESS_STATE,
    payload: bool,
  });
};

// dispatch
export const mealAdded = data => ({
  type: MEAL_ADDED,
  payload: data,
});

export const mealFetched = data => ({
  type: MEAL_FETCHED,
  payload: data,
});

export const mealSuccess = message => ({
  type: API_SUCCESS_RESPONSE,
  payload: message,
});

const mealUpdated = meal => ({
  type: MEAL_UPDATED,
  payload: meal,
});

export const updateMealFetched = meal => ({
  type: UPDATE_FETCH_MEAL,
  payload: meal,
});

const deleteMealFetched = id => ({
  type: DELETE_FETCH_MEAL,
  payload: id,
});

export const mealError = error => ({
  type: API_ERR_RESPONSE,
  payload: error,
});

export const createMealErr = error => ({
  type: CREATE_MEAL_ERROR,
  payload: error,
});

export const errorFetchingMeal = error => ({
  type: FETCH_MEAL_ERROR,
  payload: error,
});

/**
 * @description an action to create a new meal
 * @function createMeal
 * @param {object} newMeal - meal data
 * @returns {object} data
 */
export const createMeal = newMeal => async (dispatch) => {
  dispatch(creatingMeal(true));
  try {
    const response = await api('meals', 'post', newMeal);
    const { meal } = response;
    dispatch(creatingMeal(false));
    dispatch(updateMealFetched(meal));
    dispatch(mealSuccess({
      header: 'Meal Created',
      message: 'Your meal has been created successfully!',
      type: 'success',
    }));
    return response;
  } catch (err) {
    dispatch(creatingMeal(false));
    dispatch(createMealErr(err));
    return err;
  }
};

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
      response =
      await api(`meals?page=${page}&limit=${limit}&offset=${offset}`, 'get');
    } else {
      response =
       await api(
         `meals/caterer?page=${page}&limit=${limit}&offset=${offset}`,
         'get',
       );
    }
    dispatch(isLoading(false));
    dispatch(mealFetched(response));
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(errorFetchingMeal(err));
  }
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
    dispatch(isLoading(false));
    dispatch(mealSuccess({
      header: 'Meal Updated',
      message: 'Your meal has been updated successfully!',
      type: 'success',
    }));
    // dispatch(mealUpdated(response));
    return response;
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(mealError({
      header: 'Meal Update Error',
      message: 'Error updating meal',
      type: 'error',
    }));
    // dispatch(mealUpdateError(err));
    return err;
  }
};

/**
 * @function deleteMeal
 * @description deletes a meal in the application
 * @param {number} id - meal Id
 * @returns {object} response
 */
export const deleteMeal = id => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api(`meals/${id}`, 'delete');
    dispatch(deleteMealFetched(id));
    dispatch(mealSuccess({
      header: 'Meal Deleted',
      message: 'Your meal has been deleted successfully',
      type: 'success',
    }));
    dispatch(isLoading(false));
    // dispatch(mealDeleted(response));
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(mealError({
      header: 'Meal Error',
      message: 'Error deleting meal',
      type: 'error',
    }));
    // dispatch(deleteMealError(err));
  }
};
