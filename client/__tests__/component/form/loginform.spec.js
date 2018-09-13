import React from 'react';
import LoginForm from '../../../src/components/forms/LoginForm';

describe('Signup Component test-suite', () => {
  const props = {
    submit: jest.fn(),
    loading: false,
    error: '',
  };

  it('renders properly', () => {
    const LoginFormWrapper = shallow(<LoginForm {...props} />);
    expect(LoginFormWrapper.exists()).toBeTruthy();
  });

  it('shows inline errors on validation failure', () => {
    const LoginFormWrapper = shallow(<LoginForm {...props} />);
    LoginFormWrapper.setState({
      userInfo: {
        email: 123,
        password: 123,
      },
    });
    LoginFormWrapper.instance().onSubmit({ preventDefault: () => props.loading });
    const inLineErrElement = LoginFormWrapper.find('InlineError').at(0);
    expect(inLineErrElement.props().text).toEqual('Invalid email');
  });

  it('triggers setState when any Onchange event is made', () => {
    const LoginFormWrapper = shallow(<LoginForm {...props} />);
    LoginFormWrapper.instance().onChange({target: {name: 'firstname', value: 'donald'}})
    expect(LoginFormWrapper.state().userInfo.firstname).toBe('donald');
  });

  it('signs up user on successful validation', () => {
    const LoginFormWrapper = shallow(<LoginForm {...props} />);
    LoginFormWrapper.setState({
      userInfo: {
        email: 'donald@don.com',
        password: 'pass123',
        firstname: 'donald',
        lastname: 'trump',
        role: 'user',
      },
    });
    LoginFormWrapper.instance().onSubmit({ preventDefault: () => props.loading });
    expect(props.submit).toHaveBeenCalled();
  });
});
