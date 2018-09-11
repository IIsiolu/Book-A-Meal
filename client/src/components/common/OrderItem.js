import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 * @constructor
 */
class OrderItem extends Component {
  // handles conChange events
  onChange = (e) => {
    this.props.increaseQuantity(this.props.order.mealId, e.target.value);
  }

  // increase meal quantity
  increment = () => {
    this.props.increaseQuantity(
      this.props.order.mealId,
      parseInt(this.props.order.quantity) + 1,
    );
  }

  // decrease meal quantity
  decrement = () => {
    const { quantity } = this.props.order;
    const { order } = this.props;
    quantity > 1 ? this.props.increaseQuantity(
      order.mealId,
      parseInt(order.quantity) - 1,
    ) : '';
  }

  /**
   * @summary renders jsx
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { order, removeOrder } = this.props;
    return (
      <div className="orderItem">
        <div className="order-mealInfo">
          <div className="order-img">
            <img src={order.mealImg} alt="mealImg" />
          </div>
          <div className="meal-qty">
            <div className="order-nc">
              <span className="order-name">{order.name}</span>
              <span className="order-cost">(&#8358;{order.mealCost})</span>
            </div>
            <div className="order-qtyIncre">
              <h4>Qty</h4>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={order.quantity}
                min={1}
                onChange={this.onChange}
              />
              <h4>&#8358;{(order.mealCost * order.quantity)}</h4>
            </div>
          </div>
          <div className="incre-decre mous">
            <i onClick={this.increment} className="fa fa-plus arith" />
            <i onClick={this.decrement} className="fa fa-minus arith" />
          </div>

        </div>
        <i
          onClick={() => removeOrder(order.mealId)}
          className="fa fa-trash delete-orItem mous"
        />
      </div>
    );
  }
}

OrderItem.propTypes = {
  removeOrder: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default OrderItem;
