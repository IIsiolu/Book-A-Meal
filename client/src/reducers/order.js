import * as actionsTypes from '../actions/actionsTypes';
import { orderState } from './initState';

const order = (state = orderState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case actionsTypes.REMOVE_AN_ORDER:
      return {
        ...state,
        orders: [...state.orders.filter(meal => meal.mealId !== action.payload)],
      };
    case actionsTypes.CLEAR_ORDER:
      return {
        orders: [],
      };
    case actionsTypes.INCREASE_MEAL_QUANTITY:
      const meal = state.orders.map(meal => (
        meal.mealId === action.payload.mealId ?
          { ...meal, quantity: action.payload.quantity } : meal
      ));
      return {
        ...state,
        orders: meal,
      };
    case actionsTypes.ORDER_CREATED:
      return {
        ...state,
        myOrders: [...state.myOrders, action.payload],
      };
    case actionsTypes.ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default order;
