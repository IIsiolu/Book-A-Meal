import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

/**
 * @class
 */
class FoodModal extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  /**
   * @summary is invoked right before calling the render method, both on the
   *  initial mount and on subsequent updates.
   * @param {object} props
   * @param {object} state
   * @returns {object} state
   */
  static getDerivedStateFromProps(props) {
    const selectedMeal = props.menus.find(menu => (
      menu.id === props.overlayId
    ));
    return {
      data: selectedMeal,
    };
  }

  /**
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const info = this.state.data;

    return (
      <div>
        <Modal
          isOpen={this.props.isOpened}
          onRequestClose={() => this.props.isOverlayOpened(false)}
          ariaHideApp={false}
          overlayClassName="food-overlay"
          className="modalStyle"
          contentLabel="Example Modal"
        >
          <div className="modal-box">
            <div className="fancybox">
              <img
                className="fancybox-img"
                src={info.image}
                alt="food image"
              />
            </div>
            <div className="modal-description">
              <div className="order-info">
                <h2 className="capitalize">food details</h2>
                <h1>{info.name}</h1>
                <div className="rect" />
                <div className="description">
                  <h3>Description</h3>
                  <p>{info.description}</p>

                </div>
                <div className="o-price">
                  <sup>&#8358;</sup>
                  <h4>{info.price}</h4>
                </div>
                <div
                  onClick={() =>
                  this.props.addMealToOrder(info)}
                  className="order-btn capitalize"
                >
                  {this.props.placedOrders.some(item => info.id === item.mealId) === true ?
                    'added to cart' : 'add to cart'}
                </div>

              </div>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

FoodModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  menus: PropTypes.array.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
  isOverlayOpened: PropTypes.func.isRequired,
  placedOrders: PropTypes.array.isRequired,
};

export default FoodModal;
