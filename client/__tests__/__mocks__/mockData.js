const mockData = {
  authResponse: {
    success: true,
    data: {
      firstname: 'oluwafemi',
      lastname: 'adekunle',
      role: 'user',
      email: 'phem4@gmail.ciu',
    },
  },
  loginResponse: {
    success: true,
    message: 'Welcome oluwafemi',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJ1c2VyIiwiZmlyc3RuYW1lIjoib2x1d2FmZW1pIiwiaWF0IjoxNTM0MTE0MzQ0LCJleHAiOjE1MzU5MTQzNDR9.nrCV-E_kCU4ZNSnz8Z9fG34wSdvGTyOrBmru5DdvPF4',
  },
  signUpData: {
    firstname: 'oluwafemi',
    lastname: 'adekunle',
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  signinData: {
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  signupFailure: {
    message: 'User already exist',
  },
};
export default mockData;
