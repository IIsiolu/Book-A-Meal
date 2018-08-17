import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { logout } from '../../actions/auth';
import { Footer, MenuCard, OrderItem, FoodModal, MenuNav } from '../common/';
import { menuForToday, addMealToOrder,
   removeOrder, increaseQuantity,
   requestForOrder, isOverlayOpened,
    clearOrder, successState, errState } from '../../actions';

/**
 *Page to view Menu for Today
 * @class
 * @constructor
 */
class TodayMenuPage extends Component {

  constructor(){
    super();
    this.state = {
      isToggled: false
    }
  }
  /**
   * A component life cycle
   * Makes an api call for Today's menu
   * @method componentDidMount
   * @param {void}
   * @returns {undefined}
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    const today = new Date();
    const day = today.getDate() < 10 ? 
    `0${today.getDate()}` : today.getDate();
    const month = today.getMonth()+1 < 10 ? 
    `0${today.getMonth()+1}` : today.getMonth()+1;
    const todaysDate = `${today.getFullYear()}-${month}-${day}`;
    this.props.menuForToday(todaysDate);
  }
  /**
   * Component life cycle triggered on every state update
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(){
    if (this.props.orderSuccessful === true) {
      swal("Meal Ordered",
       'Your meal has been ordered successfully' , "success");
      this.props.successState(false);
      this.toggle();
      this.props.clearOrder()
    }
    if (this.props.isOrderError === true) {
      swal("Order error", 'error ordering meal' , "error");
      this.props.errState(false);
    }
  }
  /**
   * Funtion called to add a meal to customer order Item
   * @function addMealToOrder
   * @param {meal} meal - meal to be ordered
   * @returns {object} object
   */
  addMealToOrder = (meal) => {
    if(this.props.placedOrders.length){
      let alreadyExist =
       this.props.placedOrders.some((item) => meal.id === item.mealId);
      return (
        alreadyExist? '' : this.props.addMealToOrder(meal)
      )
    }else{
      console.log(meal)
      return this.props.addMealToOrder(meal)
    }
  }
  /**
   * display menu cards
   * @function menuCards
   * @param {undefined}
   * @returns {jsx}
   */
  menuCards = () => (
    this.props.menus.map((meal, key) => (
      meal.Meal !== null ? <MenuCard key={key}
       meal={meal.Meal} addMealToOrder=
      {this.addMealToOrder} isOverlayOpened=
      {this.props.isOverlayOpened} /> : ''
    )
  )
  )

  /**
   * display order card
   * @function orderCard
   * @param {undefined}
   * @returns {jsx}
   */
  orderCard = () => (
    this.props.placedOrders.map((order, key) => <OrderItem key={key}
     increaseQuantity={this.props.increaseQuantity} order={order}
      removeOrder={this.props.removeOrder} /> )
  )

  /**
   * display no menu for the day
   * @function renderNoMenu
   * @param {undefined}
   * @returns {jsx}
   */
  renderNoMenu = () => (
    <div className='no-menu-container'>
      MENU HAS NOT BEEN SET FOR TODAY
    </div>
  )
  //   called when there is no order
  noOrder = () => (
    <div>
      <h1>NO ORDER PLACED</h1>
    </div>
  )

  // called when order button is clicked
  submit = () => this.props.requestForOrder(this.props.placedOrders)

  // calculate total meal costs
  subTotal = () => {
    let total = 0;
    this.props.placedOrders.map(cost => {
      let newCost = cost.quantity * cost.mealCost
      total += newCost;
    })
    return total
  }

  // calculates value added tax
  vat = () => {
    let tax = 5/100
    let myTax = tax * this.subTotal();
    return myTax.toFixed(2)
  }
  
  // toggles order slider
  toggle = () => {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }
/**
 * Order drawer layout
 * @function drawerLayout
 * @param {void}
 * @returns {jsx} jsx
 */
  drawerLayout = () => (
    <div className = "drawer-layout">
      <div className={this.state.isToggled?"sidebar-container is-up"
       :"sidebar-container is-down"}>
        <div onClick={this.toggle} className='order-header'>
          <h1><span className='meal-notific'>
          {this.props.placedOrders.length}</span>
           {this.props.placedOrders.length >1 ? 'meals' : 'meal'}
            selected</h1>
          <i className={!this.state.isToggled ? 
            'fa fa-chevron-up': 'fa fa-chevron-down'}></i>
        </div>
        <div className="rect-title">
          <h1>My Orders</h1>
          <div className="rect"></div>
        </div>
        <div className="orders-budg">
          <div className="cus-orders">
            {this.props.placedOrders.length ? 
              this.orderCard() : this.noOrder()}
          </div>
          <div className="order-charge">
            <div className="myOrders border-text">
              <h4>Orders</h4>
              <h4>{this.props.placedOrders.length}</h4>
            </div>
            <div className="mySubtotal border-text">
              <h4>Sub-total</h4>
              <h4>&#8358;{this.subTotal()}</h4>
            </div>
            <div className="vat border-text">
              <h4>VAT (5%)</h4>
              <h4>&#8358;{this.vat()}</h4>
            </div>
            <div className="total-orders border-text">
              <h4>Total</h4>
              <h4>&#8358;{this.subTotal() - this.vat()}</h4>
            </div>
          </div>
          <div className="cat">
            <button className='clear-cart' 
            onClick={this.deleteMeal}>Clear Cart</button>
            <button onClick={this.submit}>Check out</button>
          </div>
        </div>
      </div>
    </div>
  )

  // function called to clear meal order
  deleteMeal = () => {
    swal({
      title: "Are you sure?",
      text: "Once Cleared, you will not be able to recover this orders!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.toggle();
        this.props.clearOrder();
        swal("Meal cleared successfully");
      } else {
        swal("Your meal is safe!");
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="top-content2">
          <div className="topblur">
            <h1 className="top-content-h">THE MENU</h1>
            <p className="top-content-line">
              _____________________________
            </p>
          </div>
        </div>
        <nav>
          <MenuNav logout={this.props.logout} />
        </nav>
        <div className = "main-container">
          <h2>Menu For Today</h2>
          <div className="l-menus">
            <div className = "main-bar">
              {this.props.isMenu ? this.menuCards() : this.renderNoMenu()}
            </div>
            {this.props.placedOrders.length && this.drawerLayout()}
          </div>
        </div>
        <div id="myModal" className="modal">
        {
          this.props.isOpened && <FoodModal {...this.props}
          addMealToOrder={this.addMealToOrder}  />
        }
        </div>
        <Footer />
      </div>
    );
  }
}

TodayMenuPage.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = ({ user, menuForToday, order, isOverlayOpened }) => ({
  menus: menuForToday.menus,
  isMenu: menuForToday.success,
  placedOrders: order.orders,
  isOpened: isOverlayOpened.open,
  overlayId: isOverlayOpened.id,
  isOrdering: order.loading,
  isOrderError: order.isError,
  orderError: order.error,
  orderSuccessful: order.success,
});

export default connect(mapStateToProps, { logout, menuForToday,
   addMealToOrder, removeOrder, increaseQuantity, requestForOrder,
    isOverlayOpened, clearOrder, successState, errState })(TodayMenuPage);
