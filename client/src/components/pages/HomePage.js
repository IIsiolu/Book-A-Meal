import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Footer, MenuCard, OrderItem } from '../common/';
import { menuForToday, addMealToOrder, removeOrder, increaseQuantity, requestForOrder } from '../../actions';
import img from '../../static/images/spice1.jpg';

class HomePage extends Component {
  componentWillMount() {
    console.log(this.props.isAuthenticated);
    const newLocal = this.props.role === 'user';
    if (!(newLocal)) {
      console.log('Going back because phemmy is a smart learner');
      this.props.history.push('/login');
    }
  }
  componentDidMount() {
    const today = new Date();
    console.log(today)
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1;
    const todaysDate = `${today.getFullYear()}-${month}-${day}`;
    console.log( day, month)
    this.props.menuForToday(todaysDate);
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  addMealToOrder = (meal) => {
    if(this.props.placedOrders.length){
      let alreadyExist = this.props.placedOrders.some((item) => meal.id === item.id);
      console.log(this.props.placedOrders.some((item) => meal.id == item.id))
      return (
        alreadyExist? '' : this.props.addMealToOrder(meal)
      )
    }else{
      console.log(meal)
      return this.props.addMealToOrder(meal)
    }
    
    // this.props.addMealToOrder(meal) 
  }
  menuCards = () => (
    this.props.menus.map((meal, key) => <MenuCard key={key} meal={meal.Meal} addMealToOrder={this.addMealToOrder}  />)
  )
  orderCard = () => (
    this.props.placedOrders.map((order, key) => <OrderItem key={key} increaseQuantity={this.props.increaseQuantity} order={order} removeOrder={this.props.removeOrder} /> )
  )
  noMenu = () => (
    <div>
      <h1>NO MENU FOR TODAY</h1>
    </div>
  )
  noOrder = () => (
    <div>
      <h1>NO ORDER PLACED</h1>
    </div>
  )
  submit = () => {
    this.props.requestForOrder(this.props.placedOrders)
  }
  render() {
    return (
      <div className="container">
        <div className="top-nav">
          <h2 className="logo">Book-A-Meal</h2>
          <div className="right-nav">
            <h2 className="nav-text"> <a href="selectmeal.html">Meals</a></h2>
            <h2 className="nav-text"> <a href="#aboutBook">About-Us</a></h2>
            <h2 className="nav-text"> <a onClick={this.props.logout}>Log-out</a></h2>
          </div>
        </div>
        <div className="top-content2">
          <div className="topblur">
            <h1 className="top-content-h">Made with Love</h1>
            <p className="top-content-line">_____________________________</p>
            <p className="top-content-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat interdum ipsum, ornare molestie lorem dictum nec. Vestibulum in congue lacus. Nulla ullamcorper laoreet orci </p>
            <a className="btn" href="#target"><span><button className="loginBtn"> MEALS FOR TODAY</button></span></a>
          </div>
        </div>
        <div className = "main-container">
          <div className = "main-bar">
            {this.props.isMenu ? this.menuCards() : this.noMenu()}
          </div>
          <div className = "sidebar">
            {this.props.placedOrders.length ? this.orderCard() : this.noOrder()}
            {/* u dont invoke it, you allow react do that. this.submit arrow function automatically binds */}
            {this.props.placedOrders.length ? <button onClick={this.submit}>Order now</button> : ''}
          </div>
        </div>
        
        <div className="bottom">
          <img className="aboutImg" src={img} alt="img" />
          <div className="aboutBook">
            <h1 className="bottom-h">Book a meal</h1>
            <p className="bottom-p">
              A lot of people are opting out of traditional meals in this way. Indeed, one study says that more than half of Americans’ meals are now eaten in a room with the TV on. This trend has been taking place for some time, and what’s more, we are also eating a lot more fast food than ever before,
              which means much more salt and sugar than we really should be eating.
            </p>
          </div>
        </div>
        <button onClick={this.props.logout} > Logout</button>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = ({ user, menuForToday, order }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  menus: menuForToday.menus,
  isMenu: menuForToday.success,
  placedOrders: order.orders,
});

export default connect(mapStateToProps, { logout, menuForToday, addMealToOrder, removeOrder, increaseQuantity, requestForOrder })(HomePage);
