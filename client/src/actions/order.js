import api from '../utils/api';
import * as actionTypes from './actionsTypes';
import { isLoading } from './meal';
import socket from '../utils/socket';

const addToOrder = meal => ({
  type: actionTypes.ADD_TO_ORDER,
  payload: meal,
});

export const createdOrder = meal => ({
  type: actionTypes.ORDER_CREATED,
  payload: meal,
});

export const orderError = error => ({
  type: actionTypes.ORDER_ERROR,
  payload: error,
});

const removeAnOrder = meal => ({
  type: actionTypes.REMOVE_AN_ORDER,
  payload: meal,
});

export const addMealToOrder = meal => (dispatch) => {
  const mealData = {
    mealId: meal.id,
    catererId: meal.userId,
    name: meal.name,
    quantity: 1,
    mealImg: meal.image,
    mealCost: meal.price,
  };
  return dispatch(addToOrder(mealData));
};

export const recentOrders = order => (dispatch) => {
  dispatch({
    type: actionTypes.RECENT_ORDER,
    payload: order,
  });
};

export const removeOrder = mealId => (dispatch) => {
  dispatch(removeAnOrder(mealId));
};

export const clearOrder = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ORDER,
  });
};

export const increaseQuantity = (mealId, quantity) => dispatch => (
  quantity > 0 ?
    dispatch({
      type: actionTypes.INCREASE_MEAL_QUANTITY,
      payload: { mealId, quantity },
    }) : ''
);

export const successState = bool => dispatch => (
  dispatch({
    type: actionTypes.CHANGE_ORDER_SUC_STATE,
    payload: bool,
  })
);

export const errState = bool => dispatch => (
  dispatch({
    type: actionTypes.CHANGE_ORDER_ERR_STATE,
    payload: bool,
  })
);

/**
 * @description request for an order
 * @function requestForOrder
 * @param {object} orders
 * @returns {void}
 */
export const requestForOrder = (orders, address, socketClient) => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const customerOrder = {
      meals: orders,
      address,
    };
    const response = await api('orders', 'post', { order: customerOrder });
    const { order } = response;
    dispatch(isLoading(false));
    dispatch(createdOrder(order));
    const socket = socketClient;
    orders.forEach((meal, key) => {
      socket.orderMeal(meal.catererId, order[key]);
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch({
      type: actionTypes.API_ERR_RESPONSE,
      payload: {
        header: 'Order Error',
        message: 'Order could not be requested',
        type: 'error',
      },
    });
    // dispatch(orderError(err));
  }
};

export const editOrder = orders => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const response = await api(`orders/${orders.id}`, 'put', orders);
    dispatch(isLoading(false));

    dispatch({
      type: actionTypes.API_SUCCESS_RESPONSE,
      payload: {
        header: 'Order Updated',
        message: 'Order updated successfully',
        type: 'success',
      },
    });
    const send = socket();
    send.role() === 'user' ? '' :
     send.modifyOrder({...response.order, userId: orders.userId});
  } catch (err) {
    dispatch(isLoading(false));
    dispatch({
      type: actionTypes.API_ERR_RESPONSE,
      payload: {
        header: 'Order Error',
        message: 'Order could not be edited',
        type: 'error',
      },
    });
  }
};
