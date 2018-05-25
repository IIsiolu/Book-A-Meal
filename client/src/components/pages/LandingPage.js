import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const LandingPage = ({ history }) => (

        <div className="container">
            <div className="top-nav">
                <h2 className="logo">Book-A-Meal</h2>
                <div className="right-nav">
                    <h2 className="nav-text"> <a href="#">About Us</a></h2>
                    <h2 className="nav-text"> <a href="signin.html">Login</a></h2>
                    <h2 className="nav-text"> <a href="signup.html">Sign-Up</a></h2>
                </div>
            </div>
            <div className="coverContainer">
                <img className="coverImg" src="../static/images/pexel.jpeg" />
            </div>
            <div className="content">
                <div className="info">
                    <div className="top-content">
                        <h1 className="top-content-header">Booking a meal is what we love</h1>
                        <p className="top-content-header">___________________________</p>
                        <p className="topP"> Donec elementum erat libero, ultricies molestie justo hendrerit vel. Nullam venenatis orci sit amet volutpat porttitor,</p>
                    </div>
                    <div className="bottom-content">
                        <a href="signup.html"><span><button className="loginBtn"> Sign Up</button></span></a>
                        <a href="signin.html"><span><button className="loginBtn"> Log In</button></span></a>
                    </div>
                </div>
                <div className="later">
                    <a href="home.html">i will create an account later</a>
                </div>
            </div>
	    </div>
);

LandingPage.propTypes = {
  
};
const mapStateToProps = state => ({
  isAuthenticated: state.user.user ? !!state.user.user.token : false,
});

export default connect(mapStateToProps, { logout })(LandingPage);
