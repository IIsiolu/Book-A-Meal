import React from 'react';
import { MenuPage } from '../../../src/components/pages/MenuPage';

describe('Menu Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
    role: 'caterer',
    fetchMeals: jest.fn(),
    addToMenu: jest.fn(),
    removeMeal: jest.fn(),
    changeMSuccessState: jest.fn(),
    pageCount: 0,
    page: 0,
    createMenu: jest.fn(),
    success: false,
    createdMenuError: '',
    allMeals: [
      {
        id: 1,
        name: 'Efosky',
        image: 'https://image.com',
        price: 10000,
        description: 'describe your meal',
      },
    ],
    menus: [
      {
        id: 1,
        name: 'Efosky',
        image: 'https://image.com',
        price: 10000,
        description: 'describe your meal',
      },
    ],
  };

  it('renders properly', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    expect(MenuWrapper.exists()).toBeTruthy();
  });

  it('dispatch a fetch meal action upon successfully mount', () => {
    shallow(<MenuPage {...props} />);
    expect(props.fetchMeals).toHaveBeenCalled();
  });

  it('should display render no meal when meal array is empty', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    const RenderNoMealDiv = MenuWrapper.find('.no-meal');
    expect(RenderNoMealDiv.exists()).toBeFalsy();
    MenuWrapper.setProps({
      allMeals: [],
    });
    const RenderDiv = MenuWrapper.find('.no-meal');
    expect(RenderDiv.hasClass('no-meal')).toBeTruthy();
  });

  it('should take you to guest user homepage if role is not caterer', () => {
    const user = { ...props, role: 'user' };
    shallow(<MenuPage {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('triggers changeMenuSuccessstate function after menu has been created', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    MenuWrapper.setProps({
      success: true,
    });
    expect(props.changeMSuccessState).toHaveBeenCalled();
  });

  it('fetch a new meal when pagination button is clicked', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    MenuWrapper.instance().handlePageChange({ selected: 1 });
    expect(props.fetchMeals).toHaveBeenCalled();
  });

  it('should add a meal to menu menu cart when a menu card is clicked', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    const meal = {
      id: 2,
      name: 'rice',
      image: 'image',
      description: 'very nice',
    };
    MenuWrapper.instance().addedMenus(meal);
    expect(props.addToMenu).toHaveBeenCalled();
  });

  it('should set date state value when a menu date is clicked', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    MenuWrapper.instance().onChange({
      target: {
        name: 'date',
        value: '2018-05-20',
      },
    });
    expect(MenuWrapper.state().date).toEqual({ date: '2018-05-20' });
  });

  it('should call createMenu function when submit button is clicked', () => {
    const MenuWrapper = shallow(<MenuPage {...props} />);
    MenuWrapper.instance().submit();
    expect(props.createMenu).toHaveBeenCalled();
  });
});
