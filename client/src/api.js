import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/v1/auth/login', { credentials }).then((res) => {
          
      }),
  },
};

