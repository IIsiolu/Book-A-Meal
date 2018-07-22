import { deleteMealState } from './initState';
import * as actionsTypes from '../actions/actionsTypes';

const deleteMeal = (state = deleteMealState, action) => {
  switch (action.type) {
    case actionsTypes.DELETING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.MEAL_DELETED:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case actionsTypes.DELETE_MEAL_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false,
        isMealDeleteError: true,
      };
    case actionsTypes.IS_DELETE_ERROR:
      return {
        ...state,
        isMealDeleteError: action.payload,
      };
    case actionsTypes.IS_DELETE_STATE:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};
export default deleteMeal;
