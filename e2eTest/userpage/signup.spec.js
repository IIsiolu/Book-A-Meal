const APP_BASE_PATH = 'http://localhost:7000';

module.exports = {
  'User Sign Up Form': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/signup`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#signupPage > div.bg-img > div > div > h2', 'SIGN UP')
      .pause(2000)
      .setValue('#email', 'paul@gmail.com')
      .setValue('#password', 'password890')
      .setValue('#firstname', 'Paul')
      .setValue('#lastname', 'Audu')
      .click('#signupPage > div.bg-img > div > div > form > div.log-sign > button')
      .pause(5000)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.coverContainer > div > div > h1.capitalize', 'COOK WHAT ?')
      .pause(5000);
  },
  'Menu for today page': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/home`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.top-content2 > div > h1', 'THE MENU')
      .pause(2000)
      .assert.visible('#root > div > div.main-container > div > div > div')
      .click('#root > div > div.main-container > div > div > div > div.cardt > div')
      .pause(5000)
      .assert.visible('body > div.ReactModalPortal > div > div > div')
      .pause(1000)
      .click('body > div.ReactModalPortal > div > div > div > div.modal-description > div > div.order-btn.capitalize')
      .pause(2000)
      .assert.visible('#root > div > div.main-container > div > div.drawer-layout > div > div.order-header')
      .click('#root > div > div.main-container > div > div.drawer-layout > div > div.order-header')
      .pause(4000)
      .assert.visible('#root > div > div.main-container > div > div.drawer-layout > div > div.orders-budg > div.cus-orders > div > div')
      .click('#root > div > div.main-container > div > div.drawer-layout > div > div.orders-budg > div.cat > button:nth-child(2)')
      .pause(3000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-content > input')
      .setValue('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-content > input', 'the andelean way')
      .pause(4000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
      .pause(5000);
  },
  'User order history': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/orders`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.top-content2 > div > h1', 'Customer Orders')
      .pause(2000)
      .assert.visible('#root > div > div.user-orders-c > div > div.order-row-container.order-row-cc > div:nth-child(7) > button')
      .click('#root > div > div.user-orders-c > div > div.order-row-container.order-row-cc > div:nth-child(7) > button')
      .pause(3000)
      .assert.visible('body > div.ReactModalPortal > div > div > div')
      .click('body > div.ReactModalPortal > div > div > div > div > div.order-history-item > div.call-to-action-btn > div > button')
      .pause(2000)
      .clearValue('#quantity')
      .setValue('#quantity', 4)
      .pause(2000)
      .click('body > div.ReactModalPortal > div > div > div > div > div.order-history-item > div.call-to-action-btn > div > div > button.save-item')
      .pause(2000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-title')
      .pause(1000);
  },
  'User Home Page': (browser) => {
    browser
      .url(`${APP_BASE_PATH}`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.coverContainer > div > div > h1.capitalize', 'COOK WHAT ?')
      .pause(2000)
      .end();
  },
};
