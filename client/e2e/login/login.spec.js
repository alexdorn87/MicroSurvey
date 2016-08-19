'use strict';

describe('Login view', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./login.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.loginTitleEl.getText()).toBe('Login to alex.io');
    //expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    //expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });
  it('should include dont have account text', function() {
    expect(page.loginCtaTitleEl.getText()).toBe("Don't have an account?");
    //expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    //expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });

});
