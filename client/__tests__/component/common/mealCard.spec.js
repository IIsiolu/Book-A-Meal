import React from 'react';
import MealCard from '../../../src/components/common/MealCard';

jest.mock('sweetalert');

describe('Meal Card Component test-suite', () => {
  const props = {
    addedMenus: jest.fn(),
    deleteMeal: jest.fn(),
    meal: {
      id: 1,
      name: 'Efosky',
      image: 'https://image.com',
      price: 10000,
      description: 'describe your meal',
    },
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
    const MealCardWrapper = shallow(<MealCard {...props} />);
    expect(MealCardWrapper.exists()).toBeTruthy();
  });

  it('should add a meal to menu when add to menu button is clicked', () => {
    const MealCardWrapper = shallow(<MealCard {...props} />);
    MealCardWrapper.find('.capitalize').simulate('click');
    expect(props.addedMenus).toHaveBeenCalled();
  });
});
