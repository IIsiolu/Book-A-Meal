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
        orders: [...state.orders.filter(meal =>
          meal.mealId !== action.payload)],
      };
    case actionsTypes.CLEAR_ORDER:
      return {
        orders: [],
      };
    case actionsTypes.INCREASE_MEAL_QUANTITY:
      return {
        ...state,
        orders: state.orders.map(meal => (
          meal.mealId === action.payload.mealId ?
            { ...meal, quantity: action.payload.quantity } : meal
        )),
      };
    case actionsTypes.ORDER_CREATED:
      return {
        ...state,
        loading: false,
        isError: false,
        success: true,
        myOrders: action.payload,
      };
    case actionsTypes.CHANGE_ORDER_SUC_STATE:
      return {
        ...state,
        success: action.payload,
      };
    case actionsTypes.ORDER_ERROR:
      return {
        ...state,
        loading: false,
        isError: true,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default order;
