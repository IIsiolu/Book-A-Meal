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
 * @summary - Navigate class declaration
 * @class Navigate
 * @extends {Component}
 */
  class Navigate extends Component {
    /**
     * @summary navigates to caterer dashboard or user homepage
     * @returns {void} void
     */
    componentWillMount() {
      if (this.props.user.role === 'caterer' ||
       this.props.user.role === 'super-admin') {
        this.props.history.push('/dashboard');
      } else if (this.props.user.role === 'user') {
        this.props.history.push('/index');
      }
    }

    /**
     * @summary returns composed component
     * @returns {JSX} jsx
     */
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

  Navigate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };
  return connect(mapStateToProps)(Navigate);
}
