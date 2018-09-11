import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { logout } from '../../actions/user';
import { Footer, MenuCard, OrderItem, FoodModal, MenuNav } from '../common';
import socket from '../../utils/socket';
import {
  menuForToday, addMealToOrder,
  removeOrder, increaseQuantity, userOrders,
  requestForOrder, isOverlayOpened,
  clearOrder, successState,
} from '../../actions';

/**
 *Page to view Menu for Today
 * @class
 * @constructor
 */
export class MenuForToday extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      isToggled: false,
    };
    this.socketClient = socket(this);
  }

  /**
   * @summary react component lifecycle called before mount
   * @returns {void} void
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'user')) {
      this.props.history.push('/');
    }
  }

  /**
   * A component life cycle
   * Makes an api call for Today's menu
   * @method componentDidMount
   * @param {void} void
   * @returns {undefined}
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.menuForToday(this.todaysDate());
  }

  /**
   * Component life cycle triggered after update occurs
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate() {
    if (this.props.orderSuccessful === true) {
      swal(
        'Meal Ordered',
        'Your meal has been ordered successfully', 'success',
      );
      this.props.successState(false);
      this.toggle();
      this.props.clearOrder();
    }
  }

  /**
   *@summary formats todays date
   *@function todaysDate
   @returns {string} date
   */
  todaysDate = () => {
    const today = new Date();
    const day = today.getDate() < 10 ?
      `0${today.getDate()}` : today.getDate();
    const month = today.getMonth() + 1 < 10 ?
      `0${today.getMonth() + 1}` : today.getMonth() + 1;
    return `${today.getFullYear()}-${month}-${day}`;
  }

  /**
   * @summary method to handle pagination click event
   * @function handlePageChange
   * @param {object} selected
   * @returns {void}
   */
  handlePageChange = ({ selected }) => {
    const page = selected + 1;
    localStorage.setItem('currentUserOPage', page);
    const currentPage = localStorage.getItem('currentUserOPage');
    this.props.menuForToday(this.todaysDate(), currentPage);
  }

  /**
   * @function showToast
   * @returns {function} toast
   */
  showToast = () => toast.success('order notification')

  /**
   * Funtion called to add a meal to customer order Item
   * @function addMealToOrder
   * @param {meal} meal - meal to be ordered
   * @returns {object} object
   */
  addMealToOrder = (meal) => {
    if (this.props.placedOrders.length) {
      const alreadyExist =
       this.props.placedOrders.some(item => meal.id === item.mealId);
      return (
        alreadyExist ? '' : this.props.addMealToOrder(meal)
      );
    }
    return this.props.addMealToOrder(meal);
  }

  /**
   * display menu cards
   * @function menuCards
   * @param {undefined} undefined
   * @returns {jsx} jsx
   */
  menuCards = () => (
    this.props.menus.map((meal, key) => (
      meal.Meal !== null ? <MenuCard
        key={key}
        meal={meal}
        addMealToOrder={this.addMealToOrder}
        isOverlayOpened={this.props.isOverlayOpened}
        placedOrders={this.props.placedOrders}
      /> : ''
    ))
  );

  /**
   * @description
   * display order card
   * @function orderCard
   * @param {undefined} undefined
   * @returns {jsx} jsx
   */
  orderCard = () => (
    this.props.placedOrders.map((order, key) => (<OrderItem
      key={key}
      increaseQuantity={this.props.increaseQuantity}
      order={order}
      removeOrder={this.props.removeOrder}
    />))
  )

  // function called to clear meal order
  deleteMeal = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once Cleared, you will not be able to recover this orders!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.toggle();
          this.props.clearOrder();
          swal('Meal cleared successfully');
        } else {
          swal('Your meal is safe!');
        }
      });
  }

  // called when order button is clicked
  checkout = () => (
    swal('Input delivery address', {
      content: 'input',
    })
      .then((address) => {
        swal(`your delivery address is: ${address}`);
        address.length > 5 ?
          this.props.requestForOrder(this.props.placedOrders, address, this.socketClient)
          : swal('Order Error', 'input delivery address', 'error');
      })
  );

  // calculate total meal costs
  subTotal = () => {
    let total = 0;
    this.props.placedOrders.map((cost) => {
      const newCost = cost.quantity * cost.mealCost;
      total += newCost;
    });
    return total;
  }

  // calculates value added tax
  vat = () => {
    const tax = 5 / 100;
    const myTax = tax * this.subTotal();
    return myTax.toFixed(2);
  }

  // toggles order slider
  toggle = () => {
    this.setState({
      isToggled: !this.state.isToggled,
    });
  }

  /**
   * Order drawer layout
   * @function drawerLayout
   * @param {undefined} undefined
   * @returns {jsx} jsx
   */
  drawerLayout = () => (
    <div className="drawer-layout">
      <div className={this.state.isToggled ? 'sidebar-container is-up'
       : 'sidebar-container is-down'}
      >
        <div onClick={this.toggle} className="order-header">
          <h1><span className="meal-notific">
            {this.props.placedOrders.length}
              </span>
            {this.props.placedOrders.length > 1 ? 'meals' : 'meal'}
            selected
          </h1>
          <i className={!this.state.isToggled ?
            'fa fa-chevron-up' : 'fa fa-chevron-down'}
          />
        </div>
        <div className="rect-title">
          <h1>My Orders</h1>
          <div className="rect" />
        </div>
        <div className="orders-budg">
          <div className="cus-orders">
            {this.props.placedOrders.length ?
              this.orderCard() : ''}
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
              <h4 className="capitalize">vat (5%)</h4>
              <h4>&#8358;{this.vat()}</h4>
            </div>
            <div className="total-orders border-text">
              <h4>Total</h4>
              <h4>&#8358;{this.subTotal() - this.vat()}</h4>
            </div>
          </div>
          <div className="cat">
            <button
              className="clear-cart"
              onClick={this.deleteMeal}
            >Clear Cart
            </button>
            <button onClick={this.checkout}>Check out</button>
          </div>
        </div>
      </div>
    </div>
  )

  /**
   * displays pagination buttons
   * @function renderPagination
   * @returns {JSX} jsx
   */
  renderPagination = () => (
    <ReactPaginate
      previousLabel={<i className="fa fa-chevron-left" />}
      nextLabel={<i className="fa fa-chevron-right" />}
      breakLabel={<a href="">...</a>}
      breakClassName="break-me"
      pageCount={this.props.pageCount}
      initialPage={this.props.page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageChange}
      disableInitialCallback
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  );

  /**
   * display no menu for the day
   * @function renderNoMenu
   * @param {undefined} undefined
   * @returns {jsx} JSX
   */
  renderNoMenu = () => (
    <div className="no-menu-container capitalize">
      menu has not been set for today
    </div>
  )


  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div className="container">
        <div className="top-content2">
          <div className="topblur">
            <h1 className="top-content-h capitalize">the menu</h1>
            <p className="top-content-line">
              _____________________________
            </p>
          </div>
        </div>
        <nav>
          <MenuNav logout={this.props.logout} />
        </nav>
        <div className="main-container">
          <h2>Menu For Today</h2>
          <div className="l-menus">
            <div className="main-bar">
              {this.props.isMenu ? this.menuCards() : this.renderNoMenu()}
            </div>
            {this.props.placedOrders.length && this.drawerLayout()}
          </div>
        </div>
        <div id="myModal" className="modal">
          {
          this.props.isOpened && <FoodModal
            {...this.props}
            addMealToOrder={this.addMealToOrder}
          />
        }
        </div>
        <ToastContainer autoClose={2000} />
        {this.props.isMenu && this.renderPagination()}
        <Footer />
      </div>
    );
  }
}

MenuForToday.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  orderSuccessful: PropTypes.bool.isRequired,
  isMenu: PropTypes.bool.isRequired,
  menuForToday: PropTypes.func.isRequired,
  requestForOrder: PropTypes.func.isRequired,
  successState: PropTypes.func.isRequired,
  clearOrder: PropTypes.func.isRequired,
  placedOrders: PropTypes.array.isRequired,
  addMealToOrder: PropTypes.func.isRequired,
  isOverlayOpened: PropTypes.func.isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = ({
  user, menu, order, isOverlayOpened,
}) => ({
  role: user.user.role,
  menus: menu.todayMenu,
  isMenu: menu.success,
  placedOrders: order.orders,
  isOpened: isOverlayOpened.open,
  overlayId: isOverlayOpened.id,
  isOrdering: order.loading,
  isOrderError: order.isError,
  orderError: order.error,
  orderSuccessful: order.success,
  page: menu.pagination.page,
  pageCount: menu.pagination.pageCount,
  pageSize: menu.pagination.pageSize,
  totalCount: menu.pagination.totalCount,
});

export default connect(mapStateToProps, {
  logout,
  menuForToday,
  userOrders,
  addMealToOrder,
  removeOrder,
  increaseQuantity,
  requestForOrder,
  isOverlayOpened,
  clearOrder,
  successState,
})(MenuForToday);
