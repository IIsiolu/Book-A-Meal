import React from 'react';
import TopNav from '../../../src/components/common/TopNav';

describe('Top Navigation test-suite', () => {

  const props = {
    logout: jest.fn(),
  };

  it('renders properly', () => {
    const TopNavWrapper = shallow(<TopNav {...props} />);
    expect(TopNavWrapper.exists()).toBeTruthy();
  });

  it('should logout a user when logout button is clicked', () => {
    const TopNavWrapper = shallow(<TopNav {...props} />);
    TopNavWrapper.find('.logout-btn').simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });
});
