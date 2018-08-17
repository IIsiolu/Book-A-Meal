import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

export const orderError = data => ({
  type: actionTypes.ORDER_HISTORY_ERROR,
  payload: data,
});

export const orderHistory = (page, limit, offset) => (dispatch) => {
  return (
    instance.get(`orders?page=${page}&limit=${limit}&offset=${offset}`).then((res) => {
      dispatch({
        type: actionTypes.GET_ORDER_HISTORY,
        payload: res.data,
      });
      
    }).catch((error) => {
      let myError = null;
      if (error.response) {
        myError = (error.response.data.errorMessage) ?
          error.response.data.errorMessage[0] : error.response.data;
        dispatch(orderError(myError));
      } else {
        myError = 'poor internet connection';
        dispatch(orderError(myError));
      }
    })
  );
};

