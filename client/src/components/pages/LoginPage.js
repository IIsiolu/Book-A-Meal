import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoginForm from '../forms/LoginForm';
import { logIn } from '../../actions';

class LoginPage extends Component {
    submit = (data) => (
     this.props.logIn(data)
    )
  render() {
    return (
            <div>
                <h1> Login Page </h1>
                <LoginForm submit={this.submit} {...this.props} />
            </div>
    );
  }
}

LoginPage.prototypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    logIn: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error: state.user.error,
    loading: state.user.loading
})
// mapstate for states, dispatch functions
export default connect(mapStateToProps, {logIn})(LoginPage);
