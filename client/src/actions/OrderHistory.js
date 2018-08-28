import * as actionTypes from './actionsTypes';
import api from '../utils/api';


export const orderError = data => ({
  type: actionTypes.ORDER_HISTORY_ERROR,
  payload: data,
});

/**
 * @description get order histories
 * @function orderHistory
 * @param {string} role
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const orderHistory = (role, page, limit, offset) => async (dispatch) => {
  try {
    let response;
    if (role === 'super-admin') {
      response = await api(`orders?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    } else {
      response = await api(`orders/catererOrders?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    }
    dispatch({
      type: actionTypes.GET_ORDER_HISTORY,
      payload: response,
    });
  } catch (err) {
    dispatch(orderError(err));
  }
};

