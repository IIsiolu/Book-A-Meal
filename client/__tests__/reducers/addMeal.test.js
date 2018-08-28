import {
  MEAL_ADDED, CREATE_MEAL_ERROR,
  ADD_MEAL_SUCCESS_STATE, CLEAR_MEAL_IMAGE, ADD_MEAL_IMAGE_ERR,
  ADDED_MEAL_IMAGE, CREATING_MEAL,
} from '../../src/actions/actionsTypes';
import createMeal from '../../src/reducers/createMeal';
import { createMealState } from '../../src/reducers/initState';

describe('Add Meal Reducer', () => {
  it(
    'should return create Meal initial state',
    () => {
      expect(createMeal(undefined, {})).toEqual(createMealState);
    },
  );

  it(
    'should set mealsuccessful to true when action type is MEAL_ADDED',
    () => {
      const action = {
        type: MEAL_ADDED,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.mealsuccessful).toBe(true);
      expect(newState.success).toBe(true);
    },
  );

  it(
    'should set mealsuccessful to false and success to false' +
    ' when action type is CREATE_MEAL_ERROR',
    () => {
      const action = {
        type: CREATE_MEAL_ERROR,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.mealsuccessful).toBe(false);
      expect(newState.success).toBe(false);
    },
  );

  it(
    'should change mealsuccessful state' +
    ' when action type is ADD_MEAL_SUCCESS_STATE',
    () => {
      const action = {
        type: ADD_MEAL_SUCCESS_STATE,
        payload: false,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.mealsuccessful).toBe(false);
    },
  );

  it(
    'should clear imageUrl and set imageSuccess to false' +
    ' when action type is CLEAR_MEAL_IMAGE',
    () => {
      const action = {
        type: CLEAR_MEAL_IMAGE,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.imageUrl).toBe('');
      expect(newState.mealsuccessful).toBe(false);
    },
  );

  it(
    'should set isImageError to true' +
    ' when action type is ADD_MEAL_IMAGE_ERR',
    () => {
      const action = {
        type: ADD_MEAL_IMAGE_ERR,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.isImageError).toBe(true);
      expect(newState.isImageSuccess).toBe(false);
    },
  );

  it(
    'should set isImageSuccess to true' +
    ' when action type is ADDED_MEAL_IMAGE',
    () => {
      const action = {
        type: ADDED_MEAL_IMAGE,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.isImageError).toBe(false);
      expect(newState.isImageSuccess).toBe(true);
    },
  );

  it(
    'should set loading to true' +
    ' when action type is CREATING_MEAL',
    () => {
      const action = {
        type: CREATING_MEAL,
        payload: true,
      };
      const newState = createMeal(createMealState, action);
      expect(newState.loading).toBe(true);
    },
  );
});
