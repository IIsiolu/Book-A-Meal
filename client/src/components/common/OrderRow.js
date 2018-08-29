import React from 'react';

/**
 * Order history row
 * @function OrderRow
 * @param {object} order
 * @returns {JSX} jsx
 */
const OrderRow = ({ order, id }) => (
  <div className="order-row-container order-row-cc">
    <div className="o-row-item">{id}</div>
    <div className="o-row-item">{order.id}</div>
    <div className="o-row-item">{order.Meal.name}</div>
    <div className="o-row-item">{order.User.firstname}</div>
    <div className="o-row-item">{order.quantity}</div>
    <div className="o-row-item">{order.Meal.price}</div>
    <div className="o-row-item">{new Date(order.createdAt).toDateString()}</div>
  </div>
);

export default OrderRow;
