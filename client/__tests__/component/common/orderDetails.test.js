import React from 'react';
import OrderDetails from '../../../src/components/common/OrderDetails';

describe('OrderDetails Component test-suite', () => {
  const props = {
    editOrder: jest.fn(),
    updateMeal: jest.fn(),
    view: jest.fn(),
    role: 'caterer',
    isModalOpened: false,
    order: {
      id: 1,
      createdAt: '2016',
      address: 'niger way',
      price: 10000,
      description: 'describe your meal',
      Meals: [
        {
          price: 500,
          OrderMeal: {
            status: 'pending',
            quantity: 2,
          },
          userId: 2,
        },
      ],
      User: {
        firstname: 'phemy',
      },
    },

  };

  it('renders properly', () => {
    const OrderDetailsRapper = shallow(<OrderDetails {...props} />);
    expect(OrderDetailsRapper.exists()).toBeTruthy();
  });

  it('should update a meal when submit function is called', () => {
    const OrderDetailsRapper = shallow(<OrderDetails {...props} />);
    OrderDetailsRapper.instance().onSubmit({ preventDefault: () => props.updateMeal });
    expect(props.updateMeal).toHaveBeenCalled();
  });
});
