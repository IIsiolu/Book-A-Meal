import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

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
export const fetchMeals = meal => (dispatch) => {
  dispatch(isLoading(true));
  return instance.get('meals', meal).then((res) => {
    let {data} = res.data;
    console.log(data);
    dispatch(mealFetched(data));
  }).catch((error) => {
    let myError = null;
    if (error.response) {
      console.log(mealFetchError.response);
      myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(mealFetchError(myError));
    } else {
      myError = 'poor internet connection';
      dispatch(mealFetchError(myError));
    }
  });
};
