import React from 'react';
import sweetalert from 'sweetalert';
import MealOptions from '../../../src/components/common/MealOptions';

jest.mock('sweetalert');

describe('Meal Options Component test-suite', () => {
  const props = {
    updateMeal: jest.fn(),
    deleteMeal: jest.fn(),
    meal: {
      id: 1,
      name: 'Efosky',
      image: 'https://image.com',
      price: 10000,
      description: 'describe your meal',
    },
  };
  it('renders properly', () => {
    const MealPageWrapper = shallow(<MealOptions {...props} />);
    expect(MealPageWrapper.exists()).toBeTruthy();
  });

  it('should delete a meal when delete button is clicked', () => {
    const MealPageWrapper = shallow(<MealOptions {...props} />);
    const deleteSpy = jest.spyOn(props, 'deleteMeal');
    const deSpy = jest.spyOn(MealPageWrapper.instance(), 'deleteMeal');
    sweetalert.mockResolvedValue(Promise.resolve(true));
    MealPageWrapper.instance().deleteMeal().then(() => {
      expect(deleteSpy).toHaveBeenCalled();
    });
    MealPageWrapper.find('.delete-btn').simulate('click');
    expect(deSpy).toHaveBeenCalled();
  });

  it('should make the meal card editable when the edit button is clicked', () => {
    const MealPageWrapper = mount(<MealOptions {...props} />);
    MealPageWrapper.find('.edit-meal-btn').simulate('click');
    expect(MealPageWrapper.find('.save-meal-update')).toBeTruthy();
    MealPageWrapper.setProps({
      meal: {
        id: 1,
        name: 'Beans',
        image: 'https://image.com',
        price: 10000,
        description: 'describe your meal',
      },
    });
    MealPageWrapper.find('.save-meal-update').simulate('click');
    expect(props.updateMeal).toHaveBeenCalled();
  });
});
