import decode from 'jwt-decode';
import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationToken;
