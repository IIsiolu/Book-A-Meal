import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => (
    <span className='lineError' >
        {text}
    </span >
);

InlineError.prototypes = {
  text: PropTypes.string.isRequired,
};
export default InlineError;
