import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderRow from './OrderRow';

/**
 *@class
 */
class Orders extends Component {
  allOrders = () => (
    this.props.orders.map((order, key) => (<OrderRow
      key={order.id}
      id={key}
      editOrder={this.props.editOrder}
      order={order}
      role={this.props.role}
    />))
  )
  /**
 * renders view
 * @function render
 * @returns {JSX} jsx
 */
  render() {
    return (
      <div className="order-h-c">
        <h2>Order Histories</h2>
        <div className="order-row-container">
          <div className="o-row-item">S/N</div>
          <div className="o-row-item">Customer</div>
          <div className="o-row-item">Cost</div>
          <div className="o-row-item">Address</div>
          <div className="o-row-item">Order-Date</div>
          <div className="o-row-item">Order Details</div>
        </div>
        {this.props.orders.length ? this.allOrders() : ''}
      </div>
    );
  }
}

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  editOrder: PropTypes.func.isRequired,
};

export default Orders;
