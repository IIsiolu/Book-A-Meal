import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import OrderDetails from './OrderDetails';

/**
 * @class
 * @constructor
 */
class OrderRow extends Component {
  /**
   * @method constructor
   * @returns {void} void
   */
  constructor() {
    super();
    this.state = {
      isModalOpened: false,
    };
  }

  view = () => (
    this.setState({
      isModalOpened: !this.state.isModalOpened,
    })
  )

  /**
   * @method render
   * @param {void} void
   * @returns {JSX} jsx
   */
  render() {
    const { id, order } = this.props;
    return (
      <div className="order-row-container order-row-cc">
        {this.state.isModalOpened && <OrderDetails
          {...this.props}
          isModalOpened={this.state.isModalOpened}
          view={this.view}
        />}
        <div className="o-row-item">{id + 1}</div>
        <div className="o-row-item">{order.User.firstname}</div>
        <div className="o-row-item">{order.Meals[0].price}</div>
        <div data-tip={order.address} className="o-row-item address">{order.address}</div>
        <ReactTooltip />
        <div className="o-row-item">{new Date(order.createdAt).toDateString()}</div>
        <div className="o-row-item"> <button onClick={this.view}>Details</button></div>
      </div>
    );
  }
}

OrderRow.propTypes = {
  order: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  editOrder: PropTypes.func.isRequired,
};

export default OrderRow;
