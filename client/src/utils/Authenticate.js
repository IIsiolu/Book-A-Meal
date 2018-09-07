import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './spinner';
import PopUp from './PopUp';
import { changeErrState, changeSuccessState } from '../actions';

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
    componentDidUpdate(nextProps) {
      const {
        apiError, message,
        changeErrState,
        changeSuccessState,
      } = this.props;
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      } else if (this.props.isError) {
        PopUp(apiError.header, apiError.message, apiError.type, changeErrState);
      } else if (this.props.isSuccessful) {
        PopUp(message.header, message.message, message.type, changeSuccessState);
      }
    }

    /**
     * renders page as jsx
     * @method render
     * @returns {JSX} jsx
     */
    render() {
      return (
        <Fragment>
          {this.props.isLoading && <Spinner />}
          <ComposedComponent {...this.props} />
        </Fragment>
      );
    }
  }

  const mapStateToProps = ({ user, spinner, apiResponse }) => ({
    user: user.user,
    isAuthenticated: user.isAuthenticated,
    isLoading: spinner.isLoading,
    isError: apiResponse.isError,
    apiError: apiResponse.error,
    isSuccessful: apiResponse.isSuccessful,
    message: apiResponse.message,
  });

  Authenticate.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    apiError: PropTypes.object.isRequired,
    isSuccessful: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired,
    changeErrState: PropTypes.func.isRequired,
    changeSuccessState: PropTypes.func.isRequired,

  };
  return connect(mapStateToProps, { changeErrState, changeSuccessState })(Authenticate);
}
