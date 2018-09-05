import { mealState } from './initState';
import * as actionsTypes from '../actions/actionsTypes';

const meals = (state = mealState, action) => {
  switch (action.type) {
    case actionsTypes.CREATING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.ADD_MEAL_SUCCESS_STATE:
      return {
        ...state,
        mealsuccessful: action.payload,
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
    case actionsTypes.CREATE_MEAL_ERROR:
      return {
        ...state,
        success: false,
        mealsuccessful: false,
        error: action.payload,
        loading: false,
      };
    case actionsTypes.MEAL_FETCHED:
      return {
        ...state,
        meals: action.payload.meals,
        error: null,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case actionsTypes.FETCH_MEAL_ERROR:
      return {
        ...state,
        meals: [],
        success: false,
        loading: false,

      };
    case actionsTypes.MEAL_ADDED:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case actionsTypes.UPDATE_FETCH_MEAL:
      return {
        ...state,
        mealsuccessful: true,
        meals: [action.payload, ...state.meals.filter(meal => meal.id !== action.payload.id)],
      };
    case actionsTypes.DELETE_FETCH_MEAL:
      return {
        ...state,
        meals: [...state.meals.filter(meal => meal.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default meals;
