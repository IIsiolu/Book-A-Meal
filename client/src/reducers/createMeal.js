import { createMealState } from './initState';
import * as actionsTypes from '../actions/actionsTypes';

const createMeal = (state = createMealState, action) => {
  switch (action.type) {
    case actionsTypes.CREATING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.ADDED_MEAL_IMAGE:
      return {
        ...state,
        isImageSuccess: true,
        imageUrl: action.payload,
        isImageError: false,
      };
    case actionsTypes.ADD_MEAL_IMAGE_ERR:
      return {
        ...state,
        isImageSuccess: false,
        isImageError: true,
        ImageUploadError: action.payload,
      };
    case actionsTypes.CLEAR_MEAL_IMAGE:
      return {
        ...state,
        imageUrl: '',
        isImageSuccess: false,

      };
    case actionsTypes.MEAL_ADDED:
      return {
        ...state,
        meal: action.payload,
        loading: false,
        mealsuccessful: true,
        success: true,
        error: null,
      };
    case actionsTypes.ADD_MEAL_SUCCESS_STATE:
      return {
        ...state,
        mealsuccessful: action.payload,
      };
    case actionsTypes.CREATE_MEAL_ERROR:
      return {
        ...state,
        meal: null,
        success: false,
        mealsuccessful: false,
        error: action.payload,
        loading: false,

      };
    default:
      return state;
  }
};
export default createMeal;
