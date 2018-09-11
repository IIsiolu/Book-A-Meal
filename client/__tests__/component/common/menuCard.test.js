import React from 'react';
import MenuCard from '../../../src/components/common/MenuCard';

describe('Menu Card Component test-suite', () => {
  const props = {
    addedMenus: jest.fn(),
    deleteMeal: jest.fn(),
    isOverlayOpened: jest.fn(),
    placedOrders: [
      {
        id: 1,
        name: 'Efosky',
        image: 'https://image.com',
        price: 10000,
        description: 'describe your meal',
      },
    ],
    addMealToOrder: jest.fn(),
    meal: {
      id: 1,
      name: 'Efosky',
      image: 'https://image.com',
      price: 10000,
      description: 'describe your meal',
    },
  };
  it('renders properly', () => {
    const MenuCardWrapper = shallow(<MenuCard {...props} />);
    expect(MenuCardWrapper.exists()).toBeTruthy();
  });

  it('should open an Overlay modal when menu card is clicked', () => {
    const MenuCardWrapper = shallow(<MenuCard {...props} />);
    MenuCardWrapper.find('.menu-modal').simulate('click');
    expect(props.isOverlayOpened).toHaveBeenCalled();
  });

  it('should add a meal to order when add to cart button is clicked', () => {
    const MenuCardWrapper = shallow(<MenuCard {...props} />);
    MenuCardWrapper.find('button').simulate('click');
    expect(props.addMealToOrder).toHaveBeenCalled();
  });
});
