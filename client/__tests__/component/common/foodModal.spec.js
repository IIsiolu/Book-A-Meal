import React from 'react';
import FoodModal from '../../../src/components/common/FoodModal';

describe('FoodModal Component test-suite', () => {
  const props = {
    addMealToOrder: jest.fn(),
    isOverlayOpened: jest.fn(),
    overlayId: 1,
    placedOrders: [],
    menus: [
      {
        id: 1,
        image: 'image url',
        name: 'rice',
        description: 'very good',
        price: 2000,
      },
    ],
    order: {
      price: 500,
      mealId: 2,
      userId: 2,
    },
  };

  it('renders properly', () => {
    const FoodModalWrapper = shallow(<FoodModal {...props} />);
    expect(FoodModalWrapper.exists()).toBeTruthy();
  });

  it('should add meal to order when the add button is clicked', () => {
    const FoodModalWrapper = shallow(<FoodModal {...props} />);
    FoodModalWrapper.find('.order-btn').simulate('click');
    expect(props.addMealToOrder).toHaveBeenCalled();
  });
});
