import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import LoginForm from '../forms/LoginForm';
import { logIn } from '../../actions';

/**
 * @class
 * @constructor
 */
class LoginPage extends Component {

  /**
   * @description handles submission of form data
   * @param {object} data
   * @returns {void}
   */
  submit = (data) => (
    this.props.logIn(data, this.props.history)
  )

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
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
      <div id="loginPage">
        <div className="top-nav landing-nav">
          <Link className="logo" to="/">Book-A-Meal</Link>
          <div className="right-nav">
            <Link className="nav-text" to="/signup">SignUp</Link>
          </div>
        </div>
        <div className="bg-img">
          <div className="content contentBox">
            <div className="info">
              <h2 className="info-h capitalize">already have an account?</h2>
              <p className="info-p">Use your email and
                password to login below</p>
              <LoginForm submit={this.submit} {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    logIn: PropTypes.func.isRequired
}

// maps state to props
const mapStateToProps = ({user}) => ({
    error: user.loginError,
    loading: user.loading,
    isAuthenticated: user.isAuthenticated
})

// mapstate for states, dispatch functions
export default connect(mapStateToProps, {logIn})(LoginPage);
