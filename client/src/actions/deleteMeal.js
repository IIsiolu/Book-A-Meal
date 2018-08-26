import * as actionTypes from './actionsTypes';
import api from '../utils/api';

const isLoading = bool => ({
  type: actionTypes.DELETING_MEAL,
  payload: bool,
});

const mealDeleted = id => ({
  type: actionTypes.MEAL_DELETED,
  payload: id,
});

const deleteMealFetched = id => ({
  type: actionTypes.DELETE_FETCH_MEAL,
  payload: id,
});

const deleteMealError = error => ({
  type: actionTypes.DELETE_MEAL_ERROR,
  payload: error,
});

export const DeleteErrorState = bool => (dispatch) => {
  dispatch({
    type: actionTypes.IS_DELETE_ERROR,
    payload: bool,
  });
};

export const changeSuccessState = bool => (dispatch) => {
  dispatch({
    type: actionTypes.IS_DELETE_STATE,
    payload: bool,
  });
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
    dispatch(mealDeleted(response));
  } catch (err) {
    dispatch(deleteMealError(err));
  }
};
