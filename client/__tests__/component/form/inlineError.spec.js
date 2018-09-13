import React from 'react';
import InlineError from '../../../src/components/messages/inlineError';

describe('Inline Error test-suite', () => {
  const props = {
    text: '',
  };

  it('renders properly', () => {
    const InlineErrorWrapper = shallow(<InlineError {...props} />);
    expect(InlineErrorWrapper.exists()).toBeTruthy();
  });
});
