import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

const menuAdded = mealId => ({
  type: actionTypes.MENU_ADDED,
  payload: mealId,
});
const createdMenu = menu => ({
  type: actionTypes.MENU_CREATED,
  payload: menu,
});
const menuError = error => ({
  type: actionTypes.MENU_ERROR,
  payload: error,
});
const remove = meal => ({
  type: actionTypes.REMOVE_A_MENU_ITEM,
  payload: meal,
});
export const addToMenu = meal => (dispatch) => {
  dispatch(menuAdded(meal));
};
export const removeMeal = mealId => (dispatch) => {
  dispatch(remove(mealId));
};


export const createMenu = (menus, date) => (dispatch) => {
  const newArray = menus.map(meal => meal.id);
  const params = {
    mealId: newArray,
    date,
  };
  return instance.post('menu', params).then((res) => {
    dispatch(createdMenu(res.data.data));
    console.log(res.data);
  }).catch((error) => {
    let myError = null;
    console.log(error.response);
    if (error.response) {
      myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
      dispatch(menuError(myError));
    } else {
      myError = 'poor internet connection';
      dispatch(menuError(myError));
    }
  });
};
