import { mealState } from './initState';
import {
  MEAL_ADDED, MEAL_FETCHED, CREATE_MEAL_ERROR,
  UPDATE_FETCH_MEAL, DELETE_FETCH_MEAL,
  CREATING_MEAL, FETCH_MEAL_ERROR, ADD_MEAL_IMAGE_ERR,
  ADD_MEAL_SUCCESS_STATE, ADDED_MEAL_IMAGE, CLEAR_MEAL_IMAGE,
} from '../actions/actionsTypes';

const meals = (state = mealState, action) => {
  switch (action.type) {
    case CREATING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_MEAL_SUCCESS_STATE:
      return {
        ...state,
        mealsuccessful: action.payload,
      };
    case ADDED_MEAL_IMAGE:
      return {
        ...state,
        isImageSuccess: true,
        imageUrl: action.payload,
        isImageError: false,
      };
    case ADD_MEAL_IMAGE_ERR:
      return {
        ...state,
        isImageSuccess: false,
        isImageError: true,
        ImageUploadError: action.payload,
      };
    case CLEAR_MEAL_IMAGE:
      return {
        ...state,
        imageUrl: '',
        isImageSuccess: false,

      };
    case CREATE_MEAL_ERROR:
      return {
        ...state,
        success: false,
        mealsuccessful: false,
        error: action.payload,
        loading: false,
      };
    case MEAL_FETCHED:
      return {
        ...state,
        meals: action.payload.meals,
        error: null,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case FETCH_MEAL_ERROR:
      return {
        ...state,
        meals: [],
        success: false,
        loading: false,

      };
    case MEAL_ADDED:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case UPDATE_FETCH_MEAL:
      return {
        ...state,
        mealsuccessful: true,
        meals: [action.payload, ...state.meals.filter(meal => meal.id !== action.payload.id)],
      };
    case DELETE_FETCH_MEAL:
      return {
        ...state,
        meals: [...state.meals.filter(meal => meal.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default meals;
