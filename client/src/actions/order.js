import instance from '../utils/instance';
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
  };
  return dispatch(addToOrder(mealData));
};
export const removeOrder = mealId => (dispatch) => {
  dispatch(removeAnOrder(mealId));
};
export const increaseQuantity = (mealId, quantity) => dispatch => (
  dispatch({
    type: actionTypes.INCREASE_MEAL_QUANTITY,
    payload: { mealId, quantity },
  })
);

export const requestForOrder = orders => (dispatch) => {
  console.log(orders);
  return (
    instance.post('orders', { orders }).then((res) => {
      dispatch(createdOrder(res.data.data));
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
