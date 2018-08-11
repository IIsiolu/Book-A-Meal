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
  increment = () => {
    console.log('incrementing')
    this.props.increaseQuantity(this.props.order.mealId, parseInt(this.props.order.quantity)+1)
  }
  decrement = () => {
    let {quantity} = this.props.order;
    let {order} = this.props;
    quantity>1 ? this.props.increaseQuantity(order.mealId, parseInt(order.quantity)-1) : '';
  }
  onChange = (e) => {
    this.props.increaseQuantity(this.props.order.mealId, e.target.value)
    console.log(this.state)
  }
  render() {
    const { order, removeOrder } = this.props;
    // console.log('orders created in int', order);
    return (
      <div className='orderItem'>
        <div className="order-mealInfo">
          <div className="order-img">
            <img src={order.mealImg} alt="mealImg" />
          </div>
          <div className="meal-qty">
            <div className="order-nc">
              <span className='order-name'>{order.name}</span>
              <span className='order-cost'>(&#8358;{order.mealCost})</span>
            </div>
            <div className="order-qtyIncre">
              <h4>Qty</h4>
              <input
                type='number'
                id='quantity' name='quantity'
                value={order.quantity}
                min={1}
                onChange={this.onChange}
                />
              <h4>&#8358;{(order.mealCost * order.quantity)}</h4>
            </div>           
          </div>
          <div className="incre-decre mous">
            <i onClick={ this.increment} className="fa fa-plus arith"></i>
            <i onClick={ this.decrement} className="fa fa-minus arith"></i>
          </div>
          
          </div>
          <i onClick={() => removeOrder(order.mealId) } className="fa fa-trash delete-orItem mous"></i>
      </div>
    );
  }
}

export default OrderItem;
