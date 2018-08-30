import React, { Fragment } from 'react';
import Loader from 'react-loader';

const Spinner = () => (
  <div
    className="loader"
  >
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
