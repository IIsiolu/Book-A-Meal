import React from 'react';
import Orders from '../../../src/components/common/Orders';

describe('Order Component test-suite', () => {
  const props = {
    role: 'caterer',
    editOrder: jest.fn(),
    orders: [
      {
        id: 1,
        name: 'Efosky',
        address: 'niger way',
        price: 10000,
        description: 'describe your meal',
        user: 'user',
      },
    ],
  };

  it('renders properly', () => {
    const OrderWrapper = shallow(<Orders {...props} />);
    expect(OrderWrapper.exists()).toBeTruthy();
  });
});
