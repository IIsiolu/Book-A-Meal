import * as actionTypes from './actionsTypes';
import api from '../utils/api';
import { isLoading } from './meal';


export const orderError = data => ({
  type: actionTypes.ORDER_HISTORY_ERROR,
  payload: data,
});

export const userOrderErr = data => ({
  type: actionTypes.USER_ORDER_ERRORR,
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
  dispatch(isLoading(true));
  try {
    let response;
    if (role === 'super-admin') {
      response = await api(`orders?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    } else {
      response = await api(`orders/catererOrders?page=${page}
      &limit=${limit}&offset=${offset}`, 'get');
    }
    dispatch(isLoading(false));
    dispatch({
      type: actionTypes.GET_ORDER_HISTORY,
      payload: response,
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(orderError(err));
  }
};

/**
 * @description get user order histories
 * @function orderHistory
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const userOrders = (page, limit, offset) => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api(`orders/userOrder?page=${page}
    &limit=${limit}&offset=${offset}`, 'get');
    dispatch(isLoading(false));
    dispatch({
      type: actionTypes.USER_ORDERS,
      payload: response,
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(userOrderErr(err));
  }
};

