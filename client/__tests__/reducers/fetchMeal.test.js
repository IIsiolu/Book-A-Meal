import { FETCHING_MEAL, MEAL_FETCHED, FETCH_MEAL_ERROR  } from '../../src/actions/actionsTypes';
import fetchMeals from '../../src/reducers/fetchMeals';
import { fetchMealState } from '../../src/reducers/initState';

describe('Fetch Meals Reducer', () => {
  it(
    'should return create Meal initial state',
    () => {
      expect(fetchMeals(undefined, {})).toEqual(fetchMealState);
    },
  );

  it(
    'should set success to true when action type is MEAL_ADDED',
    () => {
      const action = {
        type: MEAL_FETCHED,
        payload: {
          data: 'data',
          pagination: {
            pagination: 10,
          },
        },
      };
      const newState = fetchMeals(fetchMealState, action);
      expect(newState.success).toBe(true);
      expect(newState.loading).toBe(false);
    },
  );

  it(
    'should set success to false' +
    ' when action type is FETCH_MEAL_ERROR',
    () => {
      const action = {
        type: FETCH_MEAL_ERROR,
      };
      const newState = fetchMeals(fetchMealState, action);
      expect(newState.success).toBe(false);
    },
  );

  it(
    'should set loading to true' +
    ' when action type is ADD_MEAL_IMAGE_ERR',
    () => {
      const action = {
        type: FETCHING_MEAL,
        payload: true,
      };
      const newState = fetchMeals(fetchMealState, action);
      expect(newState.loading).toBe(true);
    },
  );
});
