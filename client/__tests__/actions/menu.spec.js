import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createMenu, createdMenu,
  menuError, changeMSuccessState,
} from '../../src/actions/menus';

import { CHANGE_MENU_SUCCESS }
  from '../../src/actions/actionsTypes';
import mockData from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Menu actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new menu with valid inputs', (done) => {
    const { menuSUccess, menuData, menuMeals } = mockData;
    const expectedActions = createdMenu(menuSUccess);
    const store = mockStore({});
    mock
      .onPost('menu', menuData)
      .reply(201, menuSUccess);
    store.dispatch(createMenu(menuMeals, '2018-06-10')).then(() => {
      expect(store.getActions()[3]).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch MENU_ERROR when menu data is invalid', (done) => {
    const { menuFailure, invalidMenuInput, menuMeals } = mockData;
    const expectedActions = menuError(menuFailure.message);
    const store = mockStore({});
    mock
      .onPost('menu', invalidMenuInput)
      .reply(400, menuFailure);
    store.dispatch(createMenu(menuMeals, '10-2018')).then(() => {
      expect(store.getActions()[2]).toEqual(expectedActions);
      done();
    });
  });

  it('should change success state when' +
  ' CHANGE_MENU_SUCCESS is dispatched', (done) => {
    const expectedActions = {
      type: CHANGE_MENU_SUCCESS,
      payload: false,
    };
    const store = mockStore({});
    store.dispatch(changeMSuccessState(false));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
