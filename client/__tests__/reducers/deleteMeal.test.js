import {
  MEAL_DELETED, DELETING_MEAL, DELETE_MEAL_ERROR, IS_DELETE_ERROR,
  IS_DELETE_STATE,
} from '../../src/actions/actionsTypes';
import deleteMeal from '../../src/reducers/deleteMeal';
import { deleteMealState } from '../../src/reducers/initState';

describe('Add Meal Reducer', () => {
  it(
    'should return create Delete Meal initial state',
    () => {
      expect(deleteMeal(undefined, {})).toEqual(deleteMealState);
    },
  );

  it(
    'should set success to true when action type is MEAL_DELETED',
    () => {
      const action = {
        type: MEAL_DELETED,
      };
      const newState = deleteMeal(deleteMealState, action);
      expect(newState.success).toBe(true);
    },
  );

  it(
    'should change loading state when action type is DELETING_MEAL',
    () => {
      const action = {
        type: DELETING_MEAL,
        payload: true,
      };
      const newState = deleteMeal(deleteMealState, action);
      expect(newState.loading).toBe(true);
    },
  );

  it(
    'should change isMealDeleteError' +
    ' state when action type is DELETE_MEAL_ERROR',
    () => {
      const action = {
        type: DELETE_MEAL_ERROR,
      };
      const newState = deleteMeal(deleteMealState, action);
      expect(newState.isMealDeleteError).toBe(true);
      expect(newState.success).toBe(false);
    },
  );

  it(
    'should change isMealDeleteError state when action type is IS_DELETE_ERROR',
    () => {
      const action = {
        type: IS_DELETE_ERROR,
        payload: false,
      };
      const newState = deleteMeal(deleteMealState, action);
      expect(newState.isMealDeleteError).toBe(false);
    },
  );

  it(
    'should change success state when action type is IS_DELETE_STATE',
    () => {
      const action = {
        type: IS_DELETE_STATE,
        payload: false,
      };
      const newState = deleteMeal(deleteMealState, action);
      expect(newState.success).toBe(false);
    },
  );
});
