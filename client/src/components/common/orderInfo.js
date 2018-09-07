import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

/**
 * @class OrderInfo
 * @constructor
 */
class OrderInfo extends Component {
  /**
   * @param {object} props
   * @returns {void} void
   */
  constructor(props) {
    super(props);
    this.state = {
      editable: props.order.OrderMeal.status === 'pending',
      editOrder: false,
      orderValues: {
        quantity: props.order.OrderMeal.quantity,
        status: 'pending',
      },
    };
  }

  setEditable = () => (
    this.setState({
      editable: true
    })
  )

  componentDidUpdate(prevProps) {
    if(this.props.order.OrderMeal.status !== prevProps.order.OrderMeal.status){
      this.props.order.OrderMeal.status === 'pending' && this.setEditable();
      this.props.order.OrderMeal.status !== 'pending' && this.setEditable();
    }
  }

  quantity = (e) => {
    this.setState({
      orderValues: {...this.state.orderValues,
         quantity: parseInt(e.target.value) }
    })
  }

  onChange = (e, {value}) => {
    this.setState({
      orderValues: {...this.state.orderValues, status: value }
    })
  }

  save = () => {
    this.props.editOrder({...this.state.orderValues,
       id: this.props.order.OrderMeal.id, userId: this.props.userId})
  }

  edit = () => {
    this.setState({
      editOrder: !this.state.editOrder
    })
  }

  cancel = () => {
    this.edit();
  }


  /**
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { order, role } = this.props;
    console.log(role)
    const catereOptions = [
      { key: 1, text: 'delivered', value: 'delivered' },
      { key: 2, text: 'cancel', value: 'cancelled' },
    ]

    const userOptions = [
      { key: 1, text: 'cancel', value: 'cancelled' },
    ]
    return (
      <div className="order-history-item">
        <div className="order-item-img">
          <img src={order.image} alt="food image" />
        </div>
        <div className="order-details">
          <div>Name: {order.name}</div>
          <div>Price: &#8358; {order.price}</div>
          <div>Qty:
            {
              this.state.editOrder && role === 'user' ?
                <input type="number"
                  className='order-item-qty'
                  id="quantity" name="quantity"
                  min="1"
                  onChange = {this.quantity}
                  value={this.state.orderValues.quantity}
                 />
                 :
                order.OrderMeal.quantity
            }
          </div>
          <div>
            Total Price: &#8358;{order.price * order.OrderMeal.quantity}
          </div>
        </div>
        <div className="order-status">
          <p>Status</p>
          {
            this.state.editOrder ? 
              <Dropdown
                selection
                wrapSelection={false}
                options={role === 'user' ? userOptions : catereOptions}
                onChange={this.onChange}
                placeholder='status'
              />
              :
              order.OrderMeal.status
          }
        </div>
        <div className="call-to-action-btn">
          {
            this.state.editable && order.OrderMeal.status === 'pending' && 
            <div className='save-cancel-btn'>
              {this.state.editOrder ? 
                <div className="call-to-actn">
                  <button className='save-item'onClick={this.save}>
                    Save
                  </button>
                  <button className='clear-cart' onClick = {this.cancel}>
                    Cancel
                  </button>
                </div> 
              : 
                <button className='edit-order-item'
                 onClick={this.edit}>edit</button>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default OrderInfo;
