import {
  MEAL_UPDATED, UPDATING_MEAL, CHANGE_SUCCESS, IS_MEAL_ERROR,
  MEAL_UPDATE_ERROR,
} from '../../src/actions/actionsTypes';
import updateMeals from '../../src/reducers/updateMeal';
import { updateMealState } from '../../src/reducers/initState';

describe('Add Meal Reducer', () => {
  it(
    'should return create Meal initial state',
    () => {
      expect(updateMeals(undefined, {})).toEqual(updateMealState);
    },
  );

  it(
    'should set success to true when action type is MEAL_ADDED',
    () => {
      const action = {
        type: MEAL_UPDATED,
      };
      const newState = updateMeals(updateMealState, action);
      expect(newState.success).toBe(true);
    },
  );

  it(
    'should set loading to false when action type is UPDATING_MEAL',
    () => {
      const action = {
        type: UPDATING_MEAL,
        payload: false,
      };
      const newState = updateMeals(updateMealState, action);
      expect(newState.loading).toBe(false);
    },
  );

  it(
    'should change success state when action type is CHANGE_SUCCESS',
    () => {
      const action = {
        type: CHANGE_SUCCESS,
        payload: false,
      };
      const newState = updateMeals(updateMealState, action);
      expect(newState.success).toBe(false);
    },
  );

  it(
    'should change isError state when action type is IS_MEAL_ERROR',
    () => {
      const action = {
        type: IS_MEAL_ERROR,
        payload: false,
      };
      const newState = updateMeals(updateMealState, action);
      expect(newState.isError).toBe(false);
    },
  );

  it(
    'should change success to false when action type is MEAL_UPDATE_ERROR',
    () => {
      const action = {
        type: MEAL_UPDATE_ERROR,
      };
      const newState = updateMeals(updateMealState, action);
      expect(newState.success).toBe(false);
      expect(newState.loading).toBe(false);
    },
  );
});
