import React from 'react';
import OrderItem from '../../../src/components/common/OrderItem';

describe('OrderItem Component test-suite', () => {
  const props = {
    removeOrder: jest.fn(),
    increaseQuantity: jest.fn(),
    order: {
      price: 500,
      mealId: 2,
      userId: 2,
    },
  };

  it('renders properly', () => {
    const OrderItemWrapper = shallow(<OrderItem {...props} />);
    expect(OrderItemWrapper.exists()).toBeTruthy();
  });

  it('should increase or decrease meal quantity when onChange function is called', () => {
    const OrderItemWrapper = shallow(<OrderItem {...props} />);
    OrderItemWrapper.instance().onChange({ target: { value: 2 } });
    expect(props.increaseQuantity).toHaveBeenCalled();
  });

  it('should remove an order item once remove button is clicked', () => {
    const OrderItemWrapper = shallow(<OrderItem {...props} />);
    OrderItemWrapper.find('.delete-orItem').simulate('click');
    expect(props.removeOrder).toHaveBeenCalled();
  });

  it('should increment a meal quantity when increment button is clicked', () => {
    const OrderItemWrapper = shallow(<OrderItem {...props} />);
    OrderItemWrapper.instance().increment();
    expect(props.increaseQuantity).toHaveBeenCalled();
  });

  it('should decrease a meal quantity when decrement button is clicked', () => {
    const OrderItemWrapper = shallow(<OrderItem {...props} />);
    OrderItemWrapper.instance().decrement();
    expect(props.increaseQuantity).toHaveBeenCalled();
  });
});
