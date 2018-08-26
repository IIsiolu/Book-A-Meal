// import expect from 'expect';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { fetchMeals } from '../../src/actions';

// import { FETCH_MEAL_ERROR, MEAL_FETCHED }
//   from '../../src/actions/actionsTypes';
// import mockData from '../__mocks__/mockData';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Fetch Meal actions', () => {
//   beforeEach(() => {
//     mock.reset();
//   });

//   it(' should get all meals in the DB', (done) => {
//     const { fetchMealSuccess } = mockData;
//     // const expectedActions = mealFetched(fetchMealSuccess);
//     const expectedActions = {
//       type: MEAL_FETCHED,
//       payload: fetchMealSuccess,
//     };
//     const store = mockStore({});
//     mock
//       .onGet('meals')
//       .reply(200, fetchMealSuccess);
//     store.dispatch(fetchMeals(1, 10)).then(() => {
//       expect(store.getActions()[1]).toEqual(expectedActions);
//       done();
//     });
//   });

//   it(
//     'should dispatch FETCH_MEAL_ERROR action when request to fetch ' +
//       'meals returns an empty response',
//     (done) => {
//       const store = mockStore({});

//       mock
//         .onGet('meals')
//         .reply(404, {
//           success: 'false',
//           message: 'No meal found',
//         });

//       const expectedActions = [
//         {
//           type: FETCH_MEAL_ERROR,
//         },
//       ];

//       store
//         .dispatch(fetchMeals())
//         .then(() => {
//           expect(store.getActions()[1]).toEqual(expectedActions);
//           done();
//         });
//     },
//   );
// });

