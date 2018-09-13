import bcrypt from 'bcrypt';
import { User } from '../../server/models';

const APP_BASE_PATH = 'http://localhost:7000';
const hashPassword = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};

module.exports = {
  before: (browser) => {
    // browser.maximizeWindow();
    User.create({
      id: 89,
      firstname: 'donald',
      email: 'dukekitche@gmail.com',
      lastname: 'Kitchen',
      role: 'caterer',
      password: 'mypassword',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }).then(() => {
      browser.maximizeWindow();
    });
  },
  'Login User': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/login`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#loginPage > div.bg-img > div > div > h2', 'ALREADY HAVE AN ACCOUNT?')
      .setValue('#email', 'nigerkitchen@gmail.com')
      .setValue('#password', 'password890')
      .pause(2000)
      .click('#loginPage > div.bg-img > div > div > form > div.log-sign > button')
      .pause(5000)
      .assert.containsText('#root > div > div.form-con-bg > div.order-bar > div > h2', 'Order Histories')
      .pause(3000)
      .end();
  },
};
