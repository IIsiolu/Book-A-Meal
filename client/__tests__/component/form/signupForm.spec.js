import React from 'react';
import SignupForm from '../../../src/components/forms/SignupForm';

describe('Signup Component test-suite', () => {
  const props = {
    submit: jest.fn(),
    loading: false,
    error: '',
    role: 'user',
  };

  it('renders properly', () => {
    const SignupFormWrapper = shallow(<SignupForm {...props} />);
    expect(SignupFormWrapper.exists()).toBeTruthy();
  });

  it('shows inline errors on validation failure', () => {
    const SignupFormWrapper = shallow(<SignupForm {...props} />);
    SignupFormWrapper.setState({
      userInfo: {
        email: 123,
        password: 123,
        firstname: 'name',
        lastname: 234,
        role: 'user',
      },
    });
    SignupFormWrapper.instance().onSubmit({ preventDefault: () => props.loading });
    const inLineErrElement = SignupFormWrapper.find('InlineError').at(0);
    expect(inLineErrElement.props().text).toEqual('Invalid email');
  });

  it('triggers setState when any Onchange event is made', () => {
    const SignupFormWrapper = shallow(<SignupForm {...props} />);
    SignupFormWrapper.instance().onChange({target: {name: 'firstname', value: 'donald'}})
    expect(SignupFormWrapper.state().userInfo.firstname).toBe('donald');
  });

  it('signs up user on successful validation', () => {
    const SignupFormWrapper = shallow(<SignupForm {...props} />);
    SignupFormWrapper.setState({
      userInfo: {
        email: 'donald@don.com',
        password: 'pass123',
        firstname: 'donald',
        lastname: 'trump',
        role: 'user',
      },
    });
    SignupFormWrapper.instance().onSubmit({ preventDefault: () => props.loading });
    expect(props.submit).toHaveBeenCalled();
  });
});
