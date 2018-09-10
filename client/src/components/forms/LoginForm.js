import React, { Component } from 'react';
import validator from 'validator';
import { Form, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InlineError from '../messages/inlineError';
/**
 * @class Login
 *
 * @extends {React.Component}
 */
class LoginForm extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      userInfo: {
        email: '',
        password: '',
      },
      errors: {},
    };
  }

  // handle change events
  onChange = (e) => {
    this.setState({
      userInfo: { ...this.state.userInfo, [e.target.name]: e.target.value },
    });
  }

  // makes an api call once submit button is clicked
  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.userInfo);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.userInfo);
    }
  }

  // validates form inputs
  validate = (userInfo) => {
    const errors = {};
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (!emailRegex.test(userInfo.email) || !userInfo.email) { errors.email = 'Invalid email'; }
    if (!userInfo.password) errors.password = "Can't be blank";
    return errors;
  }

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { userInfo, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={this.props.loading} >
        { this.props.error && <Message negative>
          <Message.Header> Something went wrong </Message.Header>
          <p>{this.props.error} </p>
        </Message>}
        <Form.Field error={!!errors.email}>
          <label className="input-form" htmlFor="email"> Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={this.onChange}
            placeholder="example@example.com"
          />
          {errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={userInfo.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} /> }

        </Form.Field>
        <div className="log-sign">
          <Button type="submit" primary>Login</Button>
          <Link to="/signup">don't have an account? SIGNUP</Link>
        </div>

      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
