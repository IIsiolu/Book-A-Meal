const APP_BASE_PATH = 'http://localhost:7000';
const path = require('path');

const imagePath = path.join(__dirname, '../../client/src/static/images/food2.jpg');
const mealImgPath = path.join(__dirname, '../../client/src/static/images/gbeans.jpg');

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
  'should create a meal': (browser) => {
    browser
      .url(`${APP_BASE_PATH}/meal`)
      .waitForElementVisible('body', 5000)
      .assert.containsText('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-o-header > button', 'Add Meal')
      .click('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-o-header > button')
      .pause(2000)
      .setValue('input[type=file]', imagePath)
      .pause(5000)
      .setValue('#name', 'Rice')
      .setValue('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > div:nth-child(3) > div > textarea', 'We want to be that little extra something that adds value to your everyday lives.')
      .setValue('#price', 999)
      .waitForElementVisible('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > div.img-preview.postedImg', 5000)
      .pause(2000)
      .click('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > button')
      .pause(5000)
      .waitForElementVisible('body > div.swal-overlay.swal-overlay--show-modal > div', 5000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .pause(3000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
  },
  'should create another meal': (browser) => {
    browser
      .refresh()
      .pause(2000)
      .setValue('#imageupload', mealImgPath)
      .pause(5000)
      .click('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-o-header > button')
      .pause(2000)
      .setValue('#name', 'Spagetti')
      .setValue('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > div:nth-child(3) > div > textarea', 'We want to be that little extra something that adds value to your everyday lives.')
      .setValue('#price', 799)
      .pause(15000)
      .waitForElementVisible('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > div.img-preview.postedImg', 5000)
      .pause(2000)
      .click('#root > div > div.m-o-Content.space-content > div.add-meal-c.go-left > form > button')
      .pause(5000)
      .waitForElementVisible('body > div.swal-overlay.swal-overlay--show-modal > div', 5000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .refresh()
      .pause(3000);
  },
  'caterer should be able to edit meal': (browser) => {
    browser
      .assert.visible('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div')
      .pause(2000)
      .click('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div > div.down-btn > button.btn-style.edit-meal-btn.left-area')
      .pause(2000)
      .clearValue('#advanced')
      .setValue('#advanced', 'a thick liquid eaten with food to add flavour')
      .clearValue('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div > div.meal-input-info > div > input')
      .setValue('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div > div.meal-input-info > div > input', 'Sauce')
      .pause(2000)
      .click('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div > div.down-btn > button.btn-style.save-meal-update.left-area')
      .pause(5000)
      .waitForElementVisible('body > div.swal-overlay.swal-overlay--show-modal > div', 5000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
      .pause(3000)
  },
  'caterer should be able to delete a meal': (browser) => {
    browser
      .refresh()
      .assert.visible('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div')
      .pause(2000)
      .click('#root > div > div.m-o-Content.space-content > div.create-meal-side-nav.meal-options > div.m-main-bar > div > div > div.down-btn > button.btn-style.delete-btn.right-area')
      .pause(2000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button')
      .pause(3000)
      .assert.visible('body > div.swal-overlay.swal-overlay--show-modal > div')
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
      .end();
  },
};
