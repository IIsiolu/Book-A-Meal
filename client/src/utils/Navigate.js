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
    componentWillMount() {
      if (this.props.user.role === 'admin') {
        this.props.history.push('/dashboard');
      } else if (this.props.user.role === 'user') {
        this.props.history.push('/home');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user.role === 'admin') {
        this.props.history.push('/dashboard');
      } else if (nextProps.user.role === 'user') {
        this.props.history.push('/home');
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

  Navigate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };
  return connect(mapStateToProps)(Navigate);
}
