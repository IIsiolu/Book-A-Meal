import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

export const isLoading = state => ({
  type: actionTypes.CREATING_MEAL,
  payload: state,
});

export const mealAdded = data => ({
  type: actionTypes.MEAL_ADDED,
  payload: data,
});
export const mealError = error => ({
  type: actionTypes.CREATE_MEAL_ERROR,
  payload: error,
});
export const createMeal = meal => (dispatch) => {
  dispatch(isLoading(true));
  return instance.post('meals', meal).then((res) => {
    console.log(res);
    dispatch(mealAdded(res));
  }).catch((error) => {
    let myError = null;
    if (error.response) {
      console.log(mealError.response);
      myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(mealError(myError));
    } else {
      myError = 'poor internet connection';
      dispatch(mealError(myError));
    }
  });
};
