import * as actionTypes from './actionsTypes';
import api from '../utils/api';


export const orderError = data => ({
  type: actionTypes.USER_ORDER_ERRORR,
  payload: data,
});

/**
 * @description get user order histories
 * @function orderHistory
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const userOrders = (page, limit, offset) => async (dispatch) => {
  try {
    const response = await api(`orders/userOrder?page=$
    {page}&limit=${limit}&offset=${offset}`);
    dispatch({
      type: actionTypes.USER_ORDERS,
      payload: response,
    });
  } catch (err) {
    dispatch(orderError(err));
  }
};
