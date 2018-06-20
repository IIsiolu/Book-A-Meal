import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderItem extends Component {

  static propTypes = {
    removeOrder: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      data: {
        quantity: 1,
        price: props.order.price
      }
      
    };
  }
  onChange = (e) => {
    this.props.increaseQuantity(this.props.order.mealId, e.target.value)
    console.log(this.state)
  }
  render() {
    const { order, removeOrder } = this.props;
    return (
      <div className='orderItem'>
        <div>{order.name}</div>
        <button onClick={() => removeOrder(order.mealId) }>remove</button>
        <input
          type='number'
          id='quantity' name='quantity'
          value={order.quantity}
          min={1}
          onChange={this.onChange}
          />
          <div>{this.state.data.price}</div>
      </div>
    );
  }
}

export default OrderItem;
