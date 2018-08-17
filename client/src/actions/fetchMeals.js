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
export const fetchMeals = (page, limit, offset) => (dispatch) => {
  dispatch(isLoading(true));
  return instance.get(`meals?page=${page}&limit=${limit}&offset=${offset}`)
    .then((res) => {
      const { data } = res;
      dispatch(mealFetched(data));
    }).catch((error) => {
      let myError = null;
      if (error.response) {
        myError = (error.response.data.errorMessage) ?
          error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(mealFetchError(myError));
      } else {
        myError = 'poor internet connection';
        dispatch(mealFetchError(myError));
      }
    });
};
