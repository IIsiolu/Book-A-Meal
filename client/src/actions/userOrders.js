import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

const orderError = data => ({
  type: actionTypes.USER_ORDER_ERRORR,
  payload: data,
});

export const userOrders = () => dispatch => (
  instance.get('orders/userOrder').then((res) => {
    dispatch({
      type: actionTypes.USER_ORDERS,
      payload: res.data.data,
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

export const userOrderError = () => (dispatch) => {
  console.log(dispatch);
};
