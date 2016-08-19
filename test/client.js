var app = require('../server/server');
var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var describe = require('mocha').describe;
var before = require('mocha').before;
var after = require('mocha').after;
var it = require('mocha').it;

//var Tracker = require('../tracker-client/src/tracker');
//var Tracker = require('../tracker-client/src/tracker').default;
var getDeviceType = require('../tracker-client/src/utils').getDeviceType;
var deviceFilter = require('../tracker-client/src/filters').deviceFilter;
var ipFilter = require('../tracker-client/src/filters').ipFilter;
var sourceFilter = require('../tracker-client/src/filters').sourceFilter;
var Survey = app.models.Survey;
var client, uuid;
var desktopUserAgent = ["Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36",
                        "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
                        "Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))"];

var mobileUserAgent = ["Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
                        "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"];

var tabletUserAgent = ["Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53",
                        "Mozilla/5.0 (iPad; U; CPU OS 3_2_2 like Mac OS X; de-de) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B500 Safari/531.21.10"];

var devices = ['Desktop', 'Mobile', 'Tablet'];

var sources = ['Default', 'SEO', 'Social Traffic'];

describe('Tracker Client', function() {
  //before(function (done) {
  //  require('./start-server');
  //  done();
  //});
  //
  //after(function (done) {
  //  app.removeAllListeners('started');
  //  app.removeAllListeners('loaded');
  //  done();
  //});

  describe('Core functionalities', function() {

    describe('obtain current device type', function() {
      var match;
      it('should test for desktop browser', function() {
        match = getDeviceType(desktopUserAgent[0]);
        assert(match === 'Desktop');

        match = getDeviceType(desktopUserAgent[1]);
        assert(match === 'Desktop');

        match = getDeviceType(desktopUserAgent[2]);
        assert(match === 'Desktop');
      });

      it('should test for phone browsers', function() {
        match = getDeviceType(mobileUserAgent[0]);
        assert(match === 'Mobile');

        match = getDeviceType(mobileUserAgent[1]);
        assert(match === 'Mobile');

      });

      it('should test for tablet browsers', function() {
        match = getDeviceType(tabletUserAgent[0]);
        assert(match === 'Tablet');

        match = getDeviceType(tabletUserAgent[1]);
        assert(match === 'Tablet');

      });
    });

    describe('device filters', function() {
      var match;
      it('should find the devicetype in array of devices', function() {
        match = deviceFilter('Mobile', devices);
        assert(match);

        match = deviceFilter('Desktop', devices);
        assert(match);

        match = deviceFilter('Tablet', devices);
        assert(match);

        match = deviceFilter('Windows Phone', devices);
        assert(!match);
      });

      it('should return true if no filter devices passed', function() {
        match = deviceFilter('Mobile');
        assert(match);

        match = deviceFilter('Desktop');
        assert(match);

        match = deviceFilter('Tablet', []);
        assert(match);
      });

    });

    describe('IP filters', function() {
      var match;
      it('should match a provided against test ips', function() {
        match = ipFilter('192.1.1.2', ['192.1.1.8', '192.1.1.3', '192.1.1.4']);
        assert(!match);

        match = ipFilter('192.1.1.2', ['192.1.1.2', '192.1.1.3', '192.1.1.4']);
        assert(match);

      });
    });

    describe('Source filters', function() {
      var match;
      it('should match a provided against test ips', function() {
        match = sourceFilter('SEO', ['SEO', 'Default', 'Social Traffic']);
        assert(match);

        match = sourceFilter('Default');
        assert(match);

        match = sourceFilter('Alien traffic', ['SEO', 'Default', 'Social Traffic']);
        assert(match);
      });
    });

  });

  describe('connecting to API', function(done) {
    //console.log(Tracker);
    //client = new Tracker({uuid: uuid}, {
    //  navigator: {
    //    userAgent: ''
    //  }
    //});
    //before(function () {
    //
    //});
  });
});
