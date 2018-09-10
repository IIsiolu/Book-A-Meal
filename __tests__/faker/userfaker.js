import faker from 'faker';

const userfake = {
  johndo: {
    id: 20,
    firstname: 'johndo',
    lastname: 'jonbrisco',
    email: 'jondoesee@example.com',
    password: '1234567',
  },
  walex: {
    firstname: 'walex',
    lastname: 'dikana',
    email: 'walenco@gmail.com',
    password: 'mykitchen',
  },
  loginWalex: {
    email: 'walenco@gmail.com',
    password: '123445455',
  },
  wronginfo: {
    email: 'wrong@gmail.com',
    password: '123445455',
  },
};

export default userfake;
