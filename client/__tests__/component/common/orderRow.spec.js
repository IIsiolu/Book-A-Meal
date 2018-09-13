import React from 'react';
import OrderRow from '../../../src/components/common/OrderRow';

describe('OrderRow Component test-suite', () => {
  const props = {
    id: 1,
    editOrder: jest.fn(),
    order: {
      id: 1,
      createdAt: '2016',
      address: 'niger way',
      price: 10000,
      description: 'describe your meal',
      Meals: [
        {
          price: 500,
        },
      ],
      User: {
        firstname: 'phemy',
      },
    },
  };

  it('renders properly', () => {
    const OrderRowRapper = shallow(<OrderRow {...props} />);
    expect(OrderRowRapper.exists()).toBeTruthy();
  });

  it('should change isModalOpened state when view function is called', () => {
    const OrderRowRapper = shallow(<OrderRow {...props} />);
    OrderRowRapper.instance().view();
    expect(OrderRowRapper.state().isModalOpened).toEqual(true);
  });
});
