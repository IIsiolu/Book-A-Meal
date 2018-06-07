import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Footer } from '../common/';
import img from '../../static/images/spice1.jpg'

class HomePage extends Component {
  componentWillMount() {
    console.log(this.props.isAuthenticated);
    const newLocal = this.props.role === 'user';
    if (!(newLocal)) {
      console.log('Going back because phemmy is a smart learner');
      this.props.history.push('/login');
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
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
const mapStateToProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
});

export default connect(mapStateToProps, { logout })(HomePage);
