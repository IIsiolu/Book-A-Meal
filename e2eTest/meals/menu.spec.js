const APP_BASE_PATH = 'http://localhost:7000';


module.exports = {
  'Login a caterer into the app': (browser) => {
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
      .pause(3000);
  },
  'should show a meal form': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/menu`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.top-nav.stay-top > h2', 'BOOK-A-MEAL')
      .pause(2000)
      .click('#root > div > div.main-container > div > div > div.add-menu > button')
      .pause(2000)
      .click('#root > div > div.main-container > div.drawer-layout > div > div.order-header')
      .pause(2000)
      .setValue('#root > div > div.main-container > div.drawer-layout > div > div.set-menu-content > div.date-btn > div > input[type="date"]', '13-09-2018')
      .click('#root > div > div.main-container > div.drawer-layout > div > div.set-menu-content > div.date-btn > button')
      .pause(5000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
      .end();
  },
};
