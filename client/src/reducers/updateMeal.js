import * as actionsTypes from '../actions/actionsTypes';
import { updateMealState } from './initState';

const updateMeals = (state = updateMealState, action) => {
  switch (action.type) {
    case actionsTypes.MEAL_UPDATED:
      return {
        ...state,
        meal: action.payload,
        loading: false,
        success: true,
      };
    case actionsTypes.UPDATING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.CHANGE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case actionsTypes.IS_MEAL_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case actionsTypes.MEAL_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default updateMeals;
