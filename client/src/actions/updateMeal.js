import * as actionTypes from './actionsTypes';
import instance from '../utils/instance';

const isLoading = bool => ({
  type: actionTypes.UPDATING_MEAL,
  payload: bool,
});

// const changeSuccess = bool => ({
//   type: actionTypes.CHANGE_SUCCESS,
//   payload:
// })

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
export const updateMeal = meal => (dispatch) => {
  console.log(meal);
  dispatch(isLoading(true));
  return instance.put(`meals/${meal.id}`, meal).then((res) => {
    console.log(res);
    // const { data } = res.data;
    dispatch(updateMealFetched(meal));
    dispatch(mealUpdated(meal));
    dispatch({
      type: actionTypes.IS_MODAL_OPENED,
      payload: false,
    });
    // dispatch({
    //   type: actionTypes.CHANGE_SUCCESS,
    //   payload: false,
    // });
  }).catch((error) => {
    let myError = null;
    dispatch({
      type: actionTypes.IS_MEAL_ERROR,
      payload: true,
    });
    if (error.response) {
      console.log(mealError.response);
      myError = (error.response.data.errorMessage) ?
        error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(mealError(myError));
    } else {
      myError = 'poor internet connection';
      dispatch(mealError(myError));
    }
  });
};

