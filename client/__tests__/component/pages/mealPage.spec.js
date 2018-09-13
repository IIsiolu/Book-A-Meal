import React from 'react';
import { MealPage } from '../../../src/components/pages/MealPage';

describe('Meal Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
    role: 'caterer',
    fetchMeals: jest.fn(),
    imageUpload: jest.fn(),
    deleteMeal: jest.fn(),
    createMeal: jest.fn(),
    updateMeal: jest.fn(),
    allMeals: [
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
    const MealPageWrapper = shallow(<MealPage {...props} />);
    expect(MealPageWrapper.exists()).toBeTruthy();
  });

  it('dispatch a fetch meal action upon successfully mount', () => {
    shallow(<MealPage {...props} />);
    expect(props.fetchMeals).toHaveBeenCalled();
  });

  it(`toggles the sideNav classnames based on the value of
  state key isNavOpened`, () => {
    const MealPageWrapper = shallow(<MealPage {...props} />);
    const SideNavSection = MealPageWrapper.find('.create-meal-side-nav');
    expect(SideNavSection.hasClass('meal-options')).toBeTruthy();
    expect(SideNavSection.hasClass('meals-options-open')).toBeFalsy();
    MealPageWrapper.setState({
      isNavOpened: true,
    });
    const OpenedSideNavSection = MealPageWrapper.find('.create-meal-side-nav');
    expect(OpenedSideNavSection.hasClass('meal-options')).toBeFalsy();
    expect(OpenedSideNavSection.hasClass('meals-options-open')).toBeTruthy();
  });

  it('should display render no meal when meal array is empty', () => {
    const MealPageWrapper = shallow(<MealPage {...props} />);
    const RenderNoMealDiv = MealPageWrapper.find('.no-meal');
    expect(RenderNoMealDiv.exists()).toBeFalsy();
    MealPageWrapper.setProps({
      allMeals: [],
    });
    const RenderDiv = MealPageWrapper.find('.no-meal');
    expect(RenderDiv.hasClass('no-meal')).toBeTruthy();
  });

  it('toggles the sideNav when add meal button is clicked', () => {
    const MealPageWrapper = shallow(<MealPage {...props} />);
    MealPageWrapper.find('.btn-default').simulate('click');
    expect(MealPageWrapper.find('.btn-open')).toBeTruthy();
  });

  it('fetch a new meal when pagination button is clicked', () => {
    const MealPageWrapper = shallow(<MealPage {...props} />);
    MealPageWrapper.instance().handlePageChange({ selected: 1 });
    expect(props.fetchMeals).toHaveBeenCalled();
  });

  it('should take you to guest user homepage if role is not caterer', () => {
    const user = { ...props, role: 'user' };
    shallow(<MealPage {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });
});
