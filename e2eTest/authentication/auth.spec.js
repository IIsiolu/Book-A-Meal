const APP_BASE_PATH = 'http://localhost:7000';

module.exports = {
  'Signup Form': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/signup`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#signupPage > div.bg-img > div > div > h2', 'SIGN UP')
      .setValue('#email', 'test@g.c')
      .setValue('#password', '2345')
      .setValue('#firstname', '678')
      .setValue('#lastname', '@234')
      .click('#signupPage > div.bg-img > div > div > form > div.log-sign > button')
      .pause(5000)
      .assert.containsText('#signupPage > div.bg-img > div > div > form > div.error.field > span', 'Invalid email')
      .assert.containsText('#signupPage > div.bg-img > div > div > form > div:nth-child(2) > span', 'Can\'t be blank and must be minimum 6')
      .assert.containsText('#signupPage > div.bg-img > div > div > form > div:nth-child(3) > span', 'firstname must be a valid letter')
      .assert.containsText('#signupPage > div.bg-img > div > div > form > div:nth-child(4) > span', 'name must be a valid letter')
      .pause(7000)
      .clearValue('#email')
      .setValue('#email', 'nigerkitchen@gmail.com')
      .clearValue('#password')
      .setValue('#password', 'password890')
      .clearValue('#firstname')
      .setValue('#firstname', 'naija')
      .clearValue('#lastname')
      .setValue('#lastname', 'kitchen')
      .click('#signupPage > div.bg-img > div > div > form > div:nth-child(5) > input')
      .click('#signupPage > div.bg-img > div > div > form > div.log-sign > button')
      .pause(5000)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.form-con-bg > div.order-bar > div > h2', 'Order Histories')
      .pause(3000)
      .end();
  },
};
