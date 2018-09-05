import {
  MEAL_ADDED, CREATE_MEAL_ERROR, UPDATE_FETCH_MEAL, DELETE_FETCH_MEAL,
  ADD_MEAL_SUCCESS_STATE, CLEAR_MEAL_IMAGE, ADD_MEAL_IMAGE_ERR,
  ADDED_MEAL_IMAGE, CREATING_MEAL, MEAL_FETCHED, FETCH_MEAL_ERROR,
} from '../../src/actions/actionsTypes';
import meals from '../../src/reducers/meals';
import { mealState } from '../../src/reducers/initState';

describe('Add Meal Reducer', () => {
  it(
    'should return create Meal initial state',
    () => {
      expect(meals(undefined, {})).toEqual(mealState);
    },
  );

  it(
    'should update the meals array way action type is MEAL_ADDED',
    () => {
      const action = {
        type: MEAL_ADDED,
        payload: { name: 'ofada', price: 200 },
      };
      const newState = meals(mealState, action);
      expect(newState.meals.length).toBeGreaterThanOrEqual(1);
    },
  );

  it(
    'should set mealsuccessful to false and success to false' +
    ' when action type is CREATE_MEAL_ERROR',
    () => {
      const action = {
        type: CREATE_MEAL_ERROR,
      };
      const newState = meals(mealState, action);
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
      const newState = meals(mealState, action);
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
      const newState = meals(mealState, action);
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
      const newState = meals(mealState, action);
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
      const newState = meals(mealState, action);
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
      const newState = meals(mealState, action);
      expect(newState.loading).toBe(true);
    },
  );

  it(
    'should set success to true when action type is MEAL_FETCHED',
    () => {
      const action = {
        type: MEAL_FETCHED,
        payload: {
          meals: [{id: 1, name: 'ofada', price: 2000 }],
          pagination: {
            pagination: 10,
          },
        },
      };
      const newState = meals(mealState, action);
      expect(newState.meals.length).toBeGreaterThanOrEqual(1);
      expect(newState.error).toBe(null);
    },
  );

  it(
    'should set success to false' +
    ' when action type is FETCH_MEAL_ERROR',
    () => {
      const action = {
        type: FETCH_MEAL_ERROR,
        payload: 'error',
      };
      const newState = meals(mealState, action);
      expect(newState.success).toBe(false);
      expect(newState.loading).toBe(false);
      expect(newState.meals.length).toBeLessThan(1);
    },
  );

  it(
    'should set mealsuccessful to true and update the meals array' +
    ' when action type is UPDATE_FETCH_MEAL',
    () => {
      const action = {
        type: UPDATE_FETCH_MEAL,
        payload: { id: 1, name: 'jollof rice' },
      };
      const newState = meals(mealState, action);
      expect(newState.mealsuccessful).toBe(true);
      expect(newState.meals.length).toBeGreaterThanOrEqual(1);
    },
  );

  it(
    'should remove a deleted meal from the meals array' +
    ' when action type is DELETE_FETCH_MEAL',
    () => {
      const action = {
        type: DELETE_FETCH_MEAL,
        payload: { id: 1, name: 'jollof rice' },
      };
      const newState = meals(mealState, action);
      expect(newState.meals.length).toBeLessThan(1);
    },
  );

});
