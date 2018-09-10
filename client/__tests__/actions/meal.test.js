import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createMeal, fetchMeals, mealSuccess, mealFetched,
  createMealErr, updateMeal, deleteMeal,
  errorFetchingMeal, mealError,
} from '../../src/actions';

import { MEAL_ADDED, FETCH_MEAL_ERROR, UPDATE_FETCH_MEAL, MEAL_UPDATE_ERROR }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const page = 1;
const limit = 1;
const offset = 1;

describe('Create Meal actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new meal with valid inputs', (done) => {
    const { mealSuccessRes, ofadaRice } = mockData;
    const expectedActions = {
      type: UPDATE_FETCH_MEAL,
      payload: mealSuccessRes.meal,
    };
    const store = mockStore({});
    mock
      .onPost('meals', ofadaRice)
      .reply(201, mealSuccessRes);
    store.dispatch(createMeal(ofadaRice)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' a meal already Exist ', (done) => {
    const { mealExist, mealData } = mockData;
    // const expectedActions = {
    //   type: CREATE_MEAL_ERROR,
    //   payload: mealExist.message,
    // };
    const expectedActions = createMealErr(mealExist.message);
    const store = mockStore({});
    mock
      .onPost('meals', mealData)
      .reply(409, mealExist);
    store.dispatch(createMeal(mealData)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' there is invalid price ', (done) => {
    const { inValidMealPrice, bread } = mockData;
    // const expectedActions = {
    //   type: CREATE_MEAL_ERROR,
    //   payload: inValidMealPrice.message,
    // };
    const expectedActions = createMealErr(inValidMealPrice.message);
    const store = mockStore({});
    mock
      .onPost('meals', bread)
      .reply(400, inValidMealPrice);
    store.dispatch(createMeal(bread)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch CREATE_MEAL_ERROR when' +
   ' there is invalid meal name ', (done) => {
    const { invalidMealName, mealData3 } = mockData;
    const expectedActions = createMealErr(invalidMealName.message);
    const store = mockStore({});
    mock
      .onPost('meals', mealData3)
      .reply(400, invalidMealName);
    store.dispatch(createMeal(mealData3)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should update a meal that already exist', (done) => {
    const { mealUpdateSuccess, mealUpdate } = mockData;
    // const expectedActions = {
    //   type: MEAL_UPDATED,
    //   payload: mealUpdateSuccess,
    // };
    const expectedActions = mealSuccess(mealUpdateSuccess);
    const store = mockStore({});
    mock
      .onPut(`meals/${mealUpdate.id}`, mealUpdate)
      .reply(200, mealUpdateSuccess);
    store.dispatch(updateMeal(mealUpdate)).then(() => {
      expect(store.getActions()[3]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch MEAL_UPDATE_ERROR for invalid meal price', (done) => {
    const { invalidPriceUdate, mealUpdate2 } = mockData;
    // const expectedActions = {
    //   type: MEAL_UPDATE_ERROR,
    //   payload: invalidPriceUdate.message,
    // };
    const expectedActions = mealError(invalidPriceUdate);
    const store = mockStore({});
    mock
      .onPut(`meals/${mealUpdate2.id}`, mealUpdate2)
      .reply(400, invalidPriceUdate);
    store.dispatch(updateMeal(mealUpdate2)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should delete a meal that already exist', (done) => {
    const { mealDeleted } = mockData;
    const expectedActions = mealSuccess(mealDeleted);
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
    const expectedActions = mealError(deleteMealError);
    const store = mockStore({});
    mock
      .onDelete('meals/7')
      .reply(404, deleteMealError);
    store.dispatch(deleteMeal(7)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should fetch a caterer meals in the DB', (done) => {
    const { fetchMealSuccess } = mockData;
    const expectedActions = mealFetched(fetchMealSuccess);
    const store = mockStore({});
    mock
      .onGet(`meals/caterer?page=${page}&limit=${limit}&offset=${offset}`)
      .reply(200, fetchMealSuccess);
    store.dispatch(fetchMeals('caterer', 1, 1, 1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should fetch all meals in the DB', (done) => {
    const { fetchMealSuccess } = mockData;
    const expectedActions = mealFetched(fetchMealSuccess);
    const store = mockStore({});
    mock
      .onGet(`meals?page=${page}&limit=${limit}&offset=${offset}`)
      .reply(200, fetchMealSuccess);
    store.dispatch(fetchMeals('super-admin', 1, 1, 1)).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it(
    'should dispatch FETCH_MEAL_ERROR action when request to fetch ' +
      'meals returns an empty response',
    (done) => {
      const store = mockStore({});

      mock
        .onGet(`meals/caterer?page=${page}&limit=${limit}&offset=${offset}`)
        .reply(500, {
          success: 'false',
          message: 'No meal found',
        });

      const expectedActions =
        {
          type: FETCH_MEAL_ERROR,
          payload: 'No meal found',
        };

      store
        .dispatch(fetchMeals('caterer', 1, 1, 1))
        .then(() => {
          expect(store.getActions()[2]).toEqual(expectedActions);
          done();
        });
    },
  );
});
