import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

const orderError = data => ({
  type: actionTypes.ORDER_HISTORY_ERROR,
  payload: data,
});

export const orderHistory = () => (dispatch) => {
  return (
    instance.get('orders').then((res) => {
      dispatch({
        type: actionTypes.GET_ORDER_HISTORY,
        payload: res.data.message,
      });
      console.log(res.data);
    }).catch((error) => {
      let myError = null;
      console.log(error.response);
      if (error.response) {
        myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data;
        dispatch(orderError(myError));
      } else {
        myError = 'poor internet connection';
        dispatch(orderError(myError));
      }
    })
  );
};

