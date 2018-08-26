import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { deleteMeal } from '../../src/actions';

import { MEAL_DELETED, DELETE_MEAL_ERROR }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Delete Meal actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should delete a meal that already exist', (done) => {
    const { mealDeleted } = mockData;
    const expectedActions = {
      type: MEAL_DELETED,
      payload: mealDeleted,
    };
    const store = mockStore({});
    mock
      .onDelete('meals/1')
      .reply(200, mealDeleted);
    store.dispatch(deleteMeal(1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should not delete a meal that does not exist', (done) => {
    const { deleteMealError } = mockData;
    const expectedActions = {
      type: DELETE_MEAL_ERROR,
      payload: deleteMealError.message,
    };
    const store = mockStore({});
    mock
      .onDelete('meals/7')
      .reply(404, deleteMealError);
    store.dispatch(deleteMeal(7)).then(() => {
      expect(store.getActions()[1]).toEqual(expectedActions);
      done();
    });
  });
});
