import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMeal } from '../../src/actions';

import { MEAL_ADDED, CREATE_MEAL_ERROR, ADD_MEAL_SUCCESS_STATE }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Meal actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new meal with valid inputs', (done) => {
    const { mealSuccess, mealData } = mockData;
    const expectedActions = {
      type: MEAL_ADDED,
      payload: mealSuccess.data,
    };
    const store = mockStore({});
    mock
      .onPost('meals', mealData)
      .reply(201, mealSuccess);
    store.dispatch(createMeal(mealData)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' a meal already Exist ', (done) => {
    const { mealExist, mealData } = mockData;
    const expectedActions = {
      type: CREATE_MEAL_ERROR,
      payload: mealExist.message,
    };
    const store = mockStore({});
    mock
      .onPost('meals', mealData)
      .reply(409, mealExist);
    store.dispatch(createMeal(mealData)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' there is invalid price ', (done) => {
    const { inValidMealPrice, mealData2 } = mockData;
    const expectedActions = {
      type: CREATE_MEAL_ERROR,
      payload: inValidMealPrice.message,
    };
    const store = mockStore({});
    mock
      .onPost('meals', mealData2)
      .reply(400, inValidMealPrice);
    store.dispatch(createMeal(mealData2)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' there is invalid meal name ', (done) => {
    const { invalidMealName, mealData3 } = mockData;
    const expectedActions = {
      type: CREATE_MEAL_ERROR,
      payload: invalidMealName.message,
    };
    const store = mockStore({});
    mock
      .onPost('meals', mealData3)
      .reply(400, invalidMealName);
    store.dispatch(createMeal(mealData3)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });
});

