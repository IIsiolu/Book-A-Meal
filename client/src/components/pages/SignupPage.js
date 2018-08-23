import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SignupForm } from '../forms';
import { signup, logIn, signupState } from '../../actions';

/**
 * @class
 * @constructor
 */
class SignupPage extends Component {

  constructor() {
    super();
    this.state={
      email: '',
      password: ''
    }
  }

  /**
   * @description handles submission of form data
   * @param {object} data
   * @returns {void}
   */
  submit = (data) => {
    this.setState({
      email: data.email,
      password: data.password
    })
    this.props.signup(data, this.props.history)
  }
  
  /**
   * @description component lifecycle method, called when
   * a component has been updated
   * @method componentDidUpdate
   * @returns {void}
   */
  componentDidUpdate(){
    if(this.props.signedUp === true) {
      this.props.logIn(this.state, this.props.history);
      this.props.signupState(false);
    }
  }

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
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
              <SignupForm role={'user'} submit={this.submit}
                {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

// maps state to props
const mapStateToProps = state => ({
    error: state.user.error,
    loading: state.user.loading,
    signedUp: state.user.signedUp
})

// mapstate for states, dispatch functions
export default connect(mapStateToProps, {signup,
   logIn, signupState})(SignupPage);
