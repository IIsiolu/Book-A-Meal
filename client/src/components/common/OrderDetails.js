import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import OrderInfo from './orderInfo';

/**
 * @class
 * @constructor
 */
class OrderDetails extends Component {
  constructor(props) {
    console.log(props.order);
    super(props);
    this.state = {
      modalIsOpen: false,
      data: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // opens the modal
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.updateMeal(this.state.data)
  }

  totalCost = () => {
    let total = 0;
    this.props.order.Meals.forEach((meal) => {
      meal.OrderMeal.status !== 'cancelled' ?
       total += parseInt(meal.OrderMeal.quantity) * parseInt(meal.price) : null
    })
    return total;
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChange =(e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  orderItems = () => 
    this.props.order.Meals.map((order, index) => 
      <OrderInfo editOrder={this.props.editOrder}
       role={this.props.role} key={index}
       userId={this.props.order.userId}
        order={order} />
    )

  render() {
    let info = this.state.data
   
    return (
      <div>
        <Modal
          isOpen={this.props.isModalOpened}
          onRequestClose={() => this.props.view()}
          ariaHideApp={false}
          overlayClassName='food-overlay'
          className='modalStyle order-modal'
          contentLabel="Example Modal"
        >
          <div className='modal-box center-items'>
          <div className="order-item-container">
            {this.orderItems()}
            <div className="total-order-item">
              <div className='order-total'>
              <h2>Orders: </h2>
              <h2>{this.props.order.Meals.length}</h2>
              </div>
              <div className='order-total'>
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
  // isOpened: PropTypes.bool.isRequired,
};

export default OrderDetails;
