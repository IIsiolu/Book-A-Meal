import React from 'react';
import OrderInfo from '../../../src/components/common/orderInfo';

describe('OrderInfo Component test-suite', () => {
  const props = {
    editOrder: jest.fn(),
    role: 'caterer',
    isModalOpened: false,
    userId: 2,
    order: {
      price: 500,
      OrderMeal: {
        status: 'pending',
        quantity: 2,
      },
      userId: 2,
    },
  };

  it('renders properly', () => {
    const OrderInfoWrapper = shallow(<OrderInfo {...props} />);
    expect(OrderInfoWrapper.exists()).toBeTruthy();
  });

  it('should update an order when save function is called', () => {
    const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
    OrderDetailsRapper.instance().save();
    expect(props.editOrder).toHaveBeenCalled();
  });

  it(
    'should change order status state to delivered when onChange is called',
    () => {
      const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
      OrderDetailsRapper.instance().onChange('event', { value: 'delivered' });
      expect(OrderDetailsRapper.state().orderValues.status).toEqual('delivered');
    },
  );

  it('should make order uneditable when editable state is false', () => {
    const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
    OrderDetailsRapper.setState({
      editable: false,
    });
    expect(OrderDetailsRapper.hasClass('save-cancel-btn')).toBeFalsy();
  });

  it('should make order editable when editable state is set to true', () => {
    const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
    OrderDetailsRapper.instance().setEditable();
    expect(OrderDetailsRapper.state().editable).toBeTruthy();
  });

  it('should update quantity in state when quantity is increased', () => {
    const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
    const quantity = {
      target: {
        value: 2,
      },
    };
    OrderDetailsRapper.instance().quantity(quantity);
    expect(OrderDetailsRapper.state().orderValues.quantity).toEqual(2);
  });

  it('should change editOrder state when an update is cancelled', () => {
    const OrderDetailsRapper = shallow(<OrderInfo {...props} />);
    OrderDetailsRapper.instance().cancel();
    expect(OrderDetailsRapper.state().editOrder).toBeTruthy();
  });
});
