import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function InlineError
 * @param {string} text - error to be displayed
 * @returns {JSX} jsx
 */
const InlineError = ({ text }) => (
  <span className="lineError" >
    {text}
  </span >
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InlineError;
