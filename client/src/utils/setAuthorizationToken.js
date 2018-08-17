import axios from 'axios';
/**
 *
 * @param {string} token -  Authorization token passed into all axios headers.
 * @returns {undefined}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationToken;
