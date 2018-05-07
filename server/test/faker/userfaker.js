import faker from 'faker';

const userfake = {
  invalidToken: 'invalidtoken',
  singupUser: {
    firstname: 'johndo',
    lastname: 'lastnames',
    email: 'johndoe@example.com',
    password: '1234567',
  },
  singupUser1: {
    firstname: 'Test',
    lastname: 'lastnames',
    email: 'testuser@example.com',
    password: '1234567',
  },
  loginUser: {
    email: 'johndoe@example.com',
    password: '123445455',
  },
  wronginfo: {
    firstname: 'johndoe',
    lastname: 'lastnames',
    email: '',
    password: '1234567',
  },
  wronginfo1: {
    firstname: 'johndo',
    lastname: 'lastnames',
    email: 'johndoe@example.com',
    password: '',
  },
  wronginfos: {
    firstname: 'johndo',
    lastname: 'lastnames',
    email: 'johndoe@example.com',
    password: '12345',
  },
  loginUser1: {
    email: 'testuser@example.com',
    password: '12345',
  },
  loginUser2: {
    email: 'testuser@example.com',
    password: '1234567',
  },
  loginerror1: {
    email: '',
    password: '12345',
  },
  loginerror2: {
    email: 'testuser@example.com',
    password: '',
  },
  loginUser3: {
    email: 'kaka@example.com',
    password: '1234567',
  },
  missingPass: {
    email: faker.internet.email(),
  },
  missingName: {
    email: faker.internet.email(),
    password: '12345',
  },
  wrongPassWord: {
    email: faker.internet.email(),
    password: '12345999',
  },
  adminsignup: {
    firstname: 'test',
    lastname: 'admin',
    email: 'admin123@gmail.com',
    password: 'adminqwe1234',
    role: 'admin'
  },
  adminLogin: {
    email: 'admin123@gmail.com',
    password: 'adminqwe1234',
  }
};

export default userfake;
