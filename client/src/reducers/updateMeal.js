import * as actionsTypes from '../actions/actionsTypes';
import { updateMealState } from './initState';

const updateMeal = (state = updateMealState, action) => {
  switch (action.type) {
    case actionsTypes.MEAL_UPDATED:
      return {
        ...state,
        meal: action.payload,
      };
    case actionsTypes.MEAL_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateMeal;
