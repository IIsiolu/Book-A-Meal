import { fetchMealState } from './initState';
import * as actionsTypes from '../actions/actionsTypes';

const fetchMeal = (state = fetchMealState, action) => {
  switch (action.type) {
    case actionsTypes.FETCHING_MEAL:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.MEAL_FETCHED:
      return {
        ...state,
        meals: action.payload.data,
        loading: false,
        success: true,
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
        error: action.payload,
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
export default fetchMeal;
