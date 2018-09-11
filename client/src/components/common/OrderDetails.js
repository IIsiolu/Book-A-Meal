import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import OrderInfo from './orderInfo';

/**
 * @class
 */
class OrderDetails extends Component {
  /**
   *@constructor
   * @param {void} void
   */
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateMeal(this.state.data);
  }

  /**
   * @function totalCost
   * @returns {number} total
   */
  totalCost = () => {
    let total = 0;
    this.props.order.Meals.forEach((meal) => {
      meal.OrderMeal.status !== 'cancelled' ?
        total += parseInt(meal.OrderMeal.quantity) * parseInt(meal.price) : null;
    });
    return total;
  }

  orderItems = () =>
    this.props.order.Meals.map((order, index) =>
      (<OrderInfo
        editOrder={this.props.editOrder}
        role={this.props.role}
        key={index}
        userId={this.props.order.userId}
        order={order}
      />))

  /**
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isModalOpened}
          onRequestClose={() => this.props.view()}
          ariaHideApp={false}
          overlayClassName="food-overlay"
          className="modalStyle order-modal"
          contentLabel="Example Modal"
        >
          <div className="modal-box center-items">
            <div className="order-item-container">
              {this.orderItems()}
              <div className="total-order-item">
                <div className="order-total">
                  <h2>Orders: </h2>
                  <h2>{this.props.order.Meals.length}</h2>
                </div>
                <div className="order-total">
                  <h2>Total Cost</h2>
                  <h2>
                  &#8358;{this.totalCost()}
                  </h2>
                </div>
              </div>
            </div>

          </div>

        </Modal>
      </div>
    );
  }
}

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
  updateMeal: PropTypes.func.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  view: PropTypes.func.isRequired,
  editOrder: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default OrderDetails;
