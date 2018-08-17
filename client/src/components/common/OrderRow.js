import React, { Component } from 'react';

const OrderRow = ({ order }) => (
  <div className="order-row-container order-row-cc">
    <div className="o-row-item">{order.id}</div>
    <div className="o-row-item">{order.Meal.name}</div>
    <div className="o-row-item">{order.User.firstname}</div>
    <div className="o-row-item">{order.quantity}</div>
    <div className="o-row-item">{order.Meal.price}</div>
    <div className="o-row-item">{order.createdAt}</div>
    <div className="o-row-item">Delivered</div>
  </div>
);
export default OrderRow;
