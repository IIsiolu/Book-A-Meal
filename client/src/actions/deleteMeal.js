import * as actionTypes from './actionsTypes';
import instance from '../utils/instance';

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

export const deleteMeal = id => (dispatch) => {
  dispatch(isLoading(true));
  return instance.delete(`meals/${id}`).then((res) => {
    dispatch(deleteMealFetched(id));
    dispatch(mealDeleted(id));
  }).catch((error) => {
    let myError = null;
    if (error.response) {
      myError = (error.response.data.errorMessage) ? 
        error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(deleteMealError(myError));
    } else {
      myError = 'poor internet connection';
      dispatch(deleteMealError(myError));
    }
  });
};
