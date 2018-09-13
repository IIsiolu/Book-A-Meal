import React from 'react';
import Footer from '../../../src/components/common/Footer';

describe('Footer test-suite', () => {

  it('renders properly', () => {
    const FooterWrapper = shallow(<Footer />);
    expect(FooterWrapper.exists()).toBeTruthy();
  });
});
