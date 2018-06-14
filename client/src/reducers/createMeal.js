import { createMealState } from './initState';
import * as actionsTypes from '../actions/actionsTypes';

const createMeal = (state = createMealState, action) => {
  switch (action.type) {
    case actionsTypes.CREATING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.MEAL_ADDED:
      return {
        ...state,
        meal: action.payload,
        loading: false,
        success: true,
        error: null,
      };
    case actionsTypes.CREATE_MEAL_ERROR:
      return {
        ...state,
        meal: null,
        success: false,
        error: action.payload,
        loading: false,

      };
    default:
      return state;
  }
};
export default createMeal;
