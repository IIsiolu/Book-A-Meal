import * as actionTypes from './actionsTypes';
import instance from '../utils/instance';

export const getMenu = menu => ({
  type: actionTypes.MENU_FOR_TODAY,
  payload: menu,
});
export const getMenuError = menu => ({
  type: actionTypes.GET_MENU_ERROR,
  payload: menu,
});

export const menuForToday = date => (dispatch) => {
  return (
    instance.get(`menu?date=${date}`).then((res) => {
      dispatch(getMenu(res.data.data));
    }).catch((error) => {
      let myError = null;
      if (error.response) {
        myError = (error.response.data.errorMessage) ?
          error.response.data.errorMessage[0] : error.response.data;
        dispatch(getMenuError(myError));
      } else {
        myError = 'poor internet connection';
        dispatch(getMenuError(myError));
      }
    })
  );
};

