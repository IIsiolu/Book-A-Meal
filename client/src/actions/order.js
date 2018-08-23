import api from '../utils/api';
import * as actionTypes from './actionsTypes';

const addToOrder = meal => ({
  type: actionTypes.ADD_TO_ORDER,
  payload: meal,
});

const createdOrder = menu => ({
  type: actionTypes.ORDER_CREATED,
  payload: menu,
});

const orderError = error => ({
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
    name: meal.name,
    quantity: 1,
    mealImg: meal.image,
    mealCost: meal.price,
  };
  return dispatch(addToOrder(mealData));
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
export const requestForOrder = orders => async (dispatch) => {
  try {
    const response = await api('orders', 'post', orders);
    const { data } = response;
    dispatch(createdOrder(data));
  } catch (err) {
    dispatch(orderError(err));
  }
};
