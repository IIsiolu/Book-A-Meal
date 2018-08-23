import * as actionTypes from './actionsTypes';
import api from '../utils/api';


export const orderError = data => ({
  type: actionTypes.ORDER_HISTORY_ERROR,
  payload: data,
});

/**
 * @description get order histories
 * @function orderHistory
 * @param {number} page
 * @param {number} limit
 * @param {number} offset
 * @returns {void}
 */
export const orderHistory = (page, limit, offset) => async (dispatch) => {
  try {
    const response = await api(`orders?page=${page}
    &limit=${limit}&offset=${offset}`);
    dispatch({
      type: actionTypes.GET_ORDER_HISTORY,
      payload: response,
    });
  } catch (err) {
    dispatch(orderError(err));
  }
};

