import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'

const catereOptions = [
  { key: 1, text: 'delivered', value: 'delivered' },
  { key: 2, text: 'cancel', value: 'cancelled' },
]

const userOptions = [
  { key: 1, text: 'cancel', value: 'cancelled' },
]

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
      editable: props.order.status === 'pending',
      editOrder: false,
      orderValues: {
        quantity: props.order.quantity,
        status: 'pending',
      }
    };
  }

  setEditable = () => (
    this.setState({
      editable: true
    })
  )

  componentDidUpdate(prevProps) {
    if(this.props.order.status !== prevProps.order.status){
      this.props.order.status === 'pending' && this.setEditable();
    }
  }

  quantity = (e) => {
    this.setState({
      orderValues: {...this.state.orderValues, quantity: e.target.value }
    })
  }

  onChange = (e, {value}) => {
    this.setState({
      orderValues: {...this.state.orderValues, status: value }
    })
  }

  save = () => {
    this.props.editOrder({...this.state.orderValues, id: this.props.order.id})
  }

  edit = () => {
    this.setState({
      editOrder: !this.state.editOrder
    })
  }

  editAction = () => {

  }

  cancel = () => {
    this.edit();
  }

  /**
   * @method render
   * @param {void} void
   * @returns {JSX} jsx
   */
  render() {
    const { id, order, role } = this.props;
    return (
      <div className="order-row-container order-row-cc">
        <div className="o-row-item">{order.id}</div>
        <div className="o-row-item">{order.Meal.name}</div>
        <div className="o-row-item">{order.User.firstname}</div>
        <div className="o-row-item">
          { this.state.editOrder && role === 'user' ? <input type="number"
           id="quantity" name="quantity"
            min="1"
            onChange = {this.quantity}
            value={this.state.orderValues.quantity} />
            : order.quantity
          }
        </div>
        <div className="o-row-item">{order.Meal.price}</div>
        <div className="o-row-item">{this.state.editOrder ? 
          <Dropdown
            selection
            wrapSelection={false}
            options={this.props.role === 'user' ? userOptions : catereOptions}
            onChange={this.onChange}
            placeholder='status'
           /> :
          order.status
        }</div>
        <div data-tip={order.address} className='o-row-item address'>{order.address}</div>
        <ReactTooltip />
        <div className="o-row-item">{new Date(order.createdAt).toDateString()}</div>
        <div className="o-row-item">
          {this.state.editable && 
            <div>
              {this.state.editOrder ? 
                <div>
                  <button onClick={this.save}>Save</button>
                  <button onClick = {this.cancel}>Cancel</button>
                </div> : <button onClick={this.edit}>edit</button>

              }
            </div>
          }
        </div>
      </div>
    );
  }
}


export default OrderRow;
