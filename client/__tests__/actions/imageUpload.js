import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { imageUpload, clearMealImage } from '../../src/actions/imageUpload';

import { ADD_MEAL_IMAGE_ERR, CLEAR_MEAL_IMAGE }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Helper actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should dispatch CLEAR_MEAL_IMAGE', (done) => {
    const expectedActions = {
      type: CLEAR_MEAL_IMAGE,
    };
    const store = mockStore({});
    store.dispatch(clearMealImage());
    expect(store.getActions()[0]).toEqual(expectedActions);
    done();
  });

  it(
    ' should dispatch ADD_MEAL_IMAGE_ERR when image is not uploaded',
    (done) => {
      const { invalidPassRes, invalidSignin } = mockData;
      const expectedActions = {
        type: ADD_MEAL_IMAGE_ERR,
      };
      const store = mockStore({});
      mock
        .onPost('https://api.cloudinary.com/v1_1/dtioo2hf0/image/upload', invalidSignin)
        .reply(401, invalidPassRes);
      store.dispatch(imageUpload('invalidSignin', 'addMeal'))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    },
  );
});
