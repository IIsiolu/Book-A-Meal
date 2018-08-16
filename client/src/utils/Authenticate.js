import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Authentication HOC
 *
 * @param {JSX} ComposedComponent
 *
 * @returns {JSX} JSX
 */
export default function (ComposedComponent) {
  /**
 * @summary - Authenticate class declaration
 * @class Authenticate
 * @extends {Component}
 */
  class Authenticate extends Component {
    componentWillMount() {
      // !(role === 'admin' || role === 'super-admin')
      if (!this.props.isAuthenticated) {
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
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ user }) => ({
    user: user.user,
    isAuthenticated: user.isAuthenticated,
  });

  Authenticate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };
  return connect(mapStateToProps)(Authenticate);
}
