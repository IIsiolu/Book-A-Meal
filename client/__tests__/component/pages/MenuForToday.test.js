import React from 'react';
import sweetalert from 'sweetalert';
import { MenuForToday } from '../../../src/components/pages/MenuForToday';

jest.mock('sweetalert');

describe('MenuForToday test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
    role: 'user',
    menuForToday: jest.fn(),
    requestForOrder: jest.fn(),
    removeOrder: jest.fn(),
    isMenu: false,
    successState: jest.fn(),
    clearOrder: jest.fn(),
    addMealToOrder: jest.fn(),
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
    orderSuccessful: false,
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
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    expect(MenuForTodayWrapper.exists()).toBeTruthy();
  });

  it('dispatch menuForToday action upon successfully mount', () => {
    shallow(<MenuForToday {...props} />);
    expect(props.menuForToday).toHaveBeenCalled();
  });

  it('should take unauthenticated user to index page before mount', () => {
    const user = { ...props, role: '' };
    shallow(<MenuForToday {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('fetch new menus when pagination button is clicked', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    MenuForTodayWrapper.instance().handlePageChange({ selected: 1 });
    expect(props.menuForToday).toHaveBeenCalled();
  });

  it('should change toggle state when toggle function is called', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    MenuForTodayWrapper.instance().toggle();
    expect(MenuForTodayWrapper.state().isToggled).toBeTruthy();
  });

  it('should render pagination component when menu for today is available', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    MenuForTodayWrapper.setProps({
      isMenu: true,
    });
    expect(MenuForTodayWrapper.find('ReactPaginate')).toBeTruthy();
  });

  it('should add a meal to cart when meal button is clicked', () => {
    const meal = {
      id: 3,
      name: 'rice',
      image: 'https://image.com',
      price: 10000,
      description: 'describe your meal',
    };
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    MenuForTodayWrapper.instance().addMealToOrder(meal);
    expect(props.addMealToOrder).toHaveBeenCalled();
  })

  it('should request for order when a user checkout', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    sweetalert.mockResolvedValue(Promise.resolve(true));
    MenuForTodayWrapper.instance().checkout().then(() => {
      expect(props.requestForOrder).toHaveBeenCalled();
    });
  });

  it('should show a prompt when you try to clear your cart', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    sweetalert.mockResolvedValue(Promise.resolve(true));
    MenuForTodayWrapper.instance().checkout().then(() => {
      expect(props.clearOrder).toHaveBeenCalled();
    });
  });

  it('should cheange order success state when an order has been placed successfully', () => {
    const MenuForTodayWrapper = shallow(<MenuForToday {...props} />);
    MenuForTodayWrapper.setProps({
      orderSuccessful: true,
    });
    expect(props.successState).toHaveBeenCalled();
  });

});
