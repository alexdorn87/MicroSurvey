var app = require('../server/server');
var request = require('supertest');
var loopback = require('loopback');
var assert = require('chai').assert;
var expect = require('chai').expect;
var describe = require('mocha').describe;
var before = require('mocha').before;
var after = require('mocha').after;
var it = require('mocha').it;


function json(verb, url) {
  return request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}

var dummyUserId = 99999;
var accessToken;
var userId;

describe('example run', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

  it('should not allow access without access token', function (done) {
    json('get', '/api/AuthUsers/' + dummyUserId + '/domains')
      .expect(404, done);
  });

});
