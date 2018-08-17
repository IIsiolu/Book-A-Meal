import instance from '../utils/instance';
import * as actionTypes from './actionsTypes';

const orderError = data => ({
  type: actionTypes.USER_ORDER_ERRORR,
  payload: data,
});

export const userOrders = (page, limit, offset) => dispatch => (
  instance.get(`orders/userOrder?page=${page}&limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch({
        type: actionTypes.USER_ORDERS,
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

export const userOrderError = () => (dispatch) => {
};
