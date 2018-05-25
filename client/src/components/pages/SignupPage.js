import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SignupForm } from '../forms';
import { signup } from '../../actions';

class SignupPage extends Component {
    submit = (data) => (
     this.props.signup(data, this.props.history)
    )
  render() {
    return (
            <div>
                <h1> Signup page </h1>
                <SignupForm submit={this.submit} {...this.props} />
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
