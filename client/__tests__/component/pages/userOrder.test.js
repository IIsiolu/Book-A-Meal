import React from 'react';
import { UserOrders } from '../../../src/components/pages/UserOrders';

describe('UserOrder Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
    role: 'user',
    userOrders: jest.fn(),
    editOrder: jest.fn(),
    pageCount: 0,
    page: 0,
    orders: [
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
    const UserOrderWrapper = shallow(<UserOrders {...props} />);
    expect(UserOrderWrapper.exists()).toBeTruthy();
  });

  it('dispatch userOrder action upon successfully mount', () => {
    shallow(<UserOrders {...props} />);
    expect(props.userOrders).toHaveBeenCalled();
  });

  it('fetch new set of order history when pagination button is clicked', () => {
    const UserOrderWrapper = shallow(<UserOrders {...props} />);
    UserOrderWrapper.instance().handlePageChange({ selected: 1 });
    expect(props.userOrders).toHaveBeenCalled();
  });

  it('should redirect you to homepage if user is not authenticated', () => {
    const user = { ...props, role: '' };
    shallow(<UserOrders {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });
});
