import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip'
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
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
    };
  }

  view = () => (
    this.setState({
      isModalOpened: !this.state.isModalOpened
    })
  )

  /**
   * @method render
   * @param {void} void
   * @returns {JSX} jsx
   */
  render() {
    const { id, order, role } = this.props;
    return (
      <div className="order-row-container order-row-cc">
        {this.state.isModalOpened && <OrderDetails {...this.props}
         isModalOpened = {this.state.isModalOpened}
         view = {this.view}
        />}
        <div className="o-row-item">{id + 1}</div>
        <div className="o-row-item">{order.User.firstname}</div>
        <div className="o-row-item">{order.Meals[0].price}</div>
        <div data-tip={order.address} className='o-row-item address'>{order.address}</div>
        <ReactTooltip />
        <div className="o-row-item">{new Date(order.createdAt).toDateString()}</div>
        <div className="o-row-item"> <button onClick={this.view}>Details</button></div>
      </div>
    );
  }
}


export default OrderRow;
