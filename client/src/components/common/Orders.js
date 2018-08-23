import React, { Component } from 'react';
import OrderRow from './OrderRow';

/**
 *@class
 */
class Orders extends Component {

  allOrders = () => (
    this.props.orders.map((order, key) => <OrderRow key={key} order={order} /> )
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
        <div className='order-row-container'>
          <div className='o-row-item'>Id</div>
          <div className='o-row-item'>Meal-Name</div>
          <div className='o-row-item'>Customer</div>
          <div className='o-row-item'>quantity</div>
          <div className='o-row-item'>Amount</div>
          <div className='o-row-item'>Order-Date</div>
          <div className='o-row-item'>status</div>
        </div>
        {this.props.orders.length ? this.allOrders() : ''}
      </div>
    );
  }
}

export default Orders;
