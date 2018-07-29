import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SignupForm } from '../forms';
import { signup } from '../../actions';
import img from '../../static/images/gbeans.jpg';

class SignupPage extends Component {
    submit = (data) => (
     this.props.signup(data, this.props.history)
    )
  render() {

    return (
            <div id="signupPage">
                <div className="top-nav landing-nav">
                  <Link className="logo" to="/">Book-A-Meal</Link>
                  <div className="right-nav">
                      <Link className="nav-text" to="/login">Login</Link>
                  </div>
                </div>
                <div className="bg-img">
                  <div className="content contentBox">
                      <div className="info">
                          <h2 className="info-h">SIGN UP</h2>
                          <p className="info-p">Sign up to your account</p>
                          <SignupForm role={'user'} submit={this.submit} {...this.props} />
                      </div>
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
