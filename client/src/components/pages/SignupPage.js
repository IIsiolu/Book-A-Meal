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
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.goBack();
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
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
          <Link className="logo capitalize" to="/">book-a-meal</Link>
          <div className="right-nav">
            <Link className="nav-text" to="/login">Login</Link>
          </div>
        </div>
        <div className="bg-img">
          <div className="content contentBox">
            <div className="info">
              <h2 className="info-h capitalize">sign up</h2>
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
const mapStateToProps = ({user}) => ({
    isAuthenticated: user.isAuthenticated,
    error: user.error,
    loading: user.loading,
    signedUp: user.signedUp
})

// mapstate for states, dispatch functions
export default connect(mapStateToProps, {signup,
   logIn, signupState})(SignupPage);
