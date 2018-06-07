import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SignupForm } from '../forms';
import { signup } from '../../actions';
import img from '../../static/images/gbeans.jpg';

class SignupPage extends Component {
    submit = (data) => (
     this.props.signup(data, this.props.history)
    )
  render() {

    return (
            <div>
                <div className="top-nav">
                    <h2 className="logo">Book-A-Meal</h2>
                    <div className="right-nav">
                        <h2 className="nav-text"> <a href="#">About Us</a></h2>
                        <h2 className="nav-text"> <Link to="/login">Login</Link></h2>
                        <h2 className="nav-text"> <Link to="/signup">SignUp</Link></h2>
                    </div>
                </div>
                <div className="coverContainer">
                    <img className="coverImg" src={img} />
                </div>
                <div className="content contentBox">
                    <div className="info">
                        <h2 className="info-h">SIGN UP</h2>
                        <p className="info-p">Sign up to your account</p>
                        <SignupForm submit={this.submit} {...this.props} />
                    </div>
                </div>
            </div>
    );
  }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error: state.user.error,
    loading: state.user.loading
})
// mapstate for states, dispatch functions
export default connect(mapStateToProps, {signup})(SignupPage);
