import React from 'react';
import MenuItems from '../../../src/components/common/MenuItems';

jest.mock('sweetalert');

describe('Menu Item Component test-suite', () => {
  const props = {
    removeMeal: jest.fn(),
    menu: {
      id: 1,
      name: 'Efosky',
      image: 'https://image.com',
      price: 10000,
      description: 'describe your meal',
    },
  };
  it('renders properly', () => {
    const MenuItemWrapper = shallow(<MenuItems {...props} />);
    expect(MenuItemWrapper.exists()).toBeTruthy();
  });

  it('should remove a meal from menu items when remove button is clicked', () => {
    const MenuItemWrapper = shallow(<MenuItems {...props} />);
    MenuItemWrapper.find('i').simulate('click');
    expect(props.removeMeal).toHaveBeenCalled();
  });
});
