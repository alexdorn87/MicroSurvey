/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage = function() {
  this.usernameEl = element(by.css('#username'));
  this.passwordEl = element(by.css('#password'));
  this.loginTitleEl = element(by.css('.login__form__title'));
  this.loginCtaTitleEl = element(by.css('.login__cta__title'));
  this.submitEl = element(by.css('form button'));
};

module.exports = new LoginPage();
