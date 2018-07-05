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
    case actionsTypes.CREATE_MEAL_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false,

      };
    default:
      return state;
  }
};
export default deleteMeal;
