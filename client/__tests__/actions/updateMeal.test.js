import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { updateMeal } from '../../src/actions';

import { UPDATE_FETCH_MEAL, MEAL_UPDATED, MEAL_UPDATE_ERROR }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Update Meal actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should update a meal that already exist', (done) => {
    const { mealUpdateSuccess, mealUpdate } = mockData;
    const expectedActions = {
      type: MEAL_UPDATED,
      payload: mealUpdateSuccess,
    };
    const store = mockStore({});
    mock
      .onPut(`meals/${mealUpdate.id}`, mealUpdate)
      .reply(200, mealUpdateSuccess);
    store.dispatch(updateMeal(mealUpdate)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch MEAL_UPDATE_ERROR for invalid meal price', (done) => {
    const { invalidPriceUdate, mealUpdate2 } = mockData;
    const expectedActions = {
      type: MEAL_UPDATE_ERROR,
      payload: invalidPriceUdate.message,
    };
    const store = mockStore({});
    mock
      .onPut(`meals/${mealUpdate2.id}`, mealUpdate2)
      .reply(400, invalidPriceUdate);
    store.dispatch(updateMeal(mealUpdate2)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });
});
