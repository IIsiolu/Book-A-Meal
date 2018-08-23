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

    /**
     * Check if user has a valid token
     * @method componentWillMount
     * @returns {undefined}
     *
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    /**
     * Check if user has a valid token
     * @method componentWillUpdate
     * @param {nextProps} nextProps - the props before update
     * @returns {undefined}
     *
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }
    
    /**
     * renders page as jsx
     * @method render
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

  Authenticate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };
  return connect(mapStateToProps)(Authenticate);
}
