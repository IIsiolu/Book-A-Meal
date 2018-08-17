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
  console.log(date);
  return (
    instance.get(`menu?date=${date}`).then((res) => {
      dispatch(getMenu(res.data.data));
      console.log(res.data);
    }).catch((error) => {
      let myError = null;
      if (error.response) {
        myError = (error.response.data.errorMessage) ?
          error.response.data.errorMessage[0] : error.response.data;
        dispatch(getMenuError(myError));
      } else {
        // console.log(error);
        myError = 'poor internet connection';
        dispatch(getMenuError(myError));
      }
    })
  );
};

