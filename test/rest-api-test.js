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

describe('Main REST API request', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });

/*
  describe('User object CRUD', function () {

    it('should create a user', function (done) {
      json('post', '/api/AuthUsers')
        .send({
          firstName: 'space',
          lastName: 'john',
          password: 'pass',
          username: 'dummyuser',
          email: 'squishy@test.com',
        })
        .expect(200, done);
    });


    it('should not allow access without access token', function (done) {
      json('get', '/api/AuthUsers/' + dummyUserId + '/domains')
        .expect(401, done);
    });


    it('should login in and get access', function(done){
      json('post', '/api/AuthUsers/login')
        .send({
          username: 'dummyuser',
          password: 'pass'
        }).expect(200, function(err, res){
          assert(typeof res.body == 'object');
          assert(res.body.id, 'must have an access token.');
          access_token = res.body.id;
          done();
        });
    });



    /*
    it('should login the user and get all domains', function (done) {
      json('post', '/api/AuthUsers/login')
        .send({
          username: 'dummyuser',
          password: 'password'
        })
        .expect(200, function (err, res) {
          assert(typeof res.body === 'object');

          assert(res.body.id, 'must have an access token');
          accessToken = res.body.id;
          json('get', '/api/AuthUsers/' + dummyUserId + '/domains?access_token=' + accessToken)
            .expect(200, function (err, res) {
              assert(Array.isArray(res.body), 'should return array of domains');
              done();
            });
        });
    });
    */
	/*
	it('should logout user', function(done){
      json('post', '/api/AuthUsers/logout')
      .send(access_token);
      done();
    });

    it('should logout and delete', function (done) {
      json('post', '/api/AuthUsers/login')
        .send({
          username: 'dummyuser',
          password: 'pass'
        })
        .expect(200, function (err, res) {
          assert(res.body.id, 'must have an access token');
          userId = res.body.userId;
          accessToken = res.body.id;

		  json('delete', '/api/AuthUsers/' + userId +
					'?access_token=' + accessToken)
            .expect(200, done);
        });
    });
 });//End of User object CRUD.

  /*
  describe('Domain object CRUD', function () {
    var dummyDomainId = 99999;
    before(function (done) {
      json('post', '/api/AuthUsers')
        .send({
          username: 'dummytestuser',
          password: 'dummytestuser',
          email: 'dummytestuser@test.com',
          id: dummyUserId
        })
        .expect(200, function (err, res) {
          if (err) {
            done(err);
          }
          json('post', '/api/AuthUsers/login')
            .send({
              username: 'dummytestuser',
              password: 'dummytestuser'
            })
            .expect(200, function (err, res) {
              assert(typeof res.body === 'object');
              assert(res.body.id, 'must have an access token');
              accessToken = res.body.id;
              done();
            });
        });
    });

    after(function (done) {
      json('post', '/api/AuthUsers/login')
        .send({
          username: 'dummytestuser',
          password: 'dummytestuser'
        })
        .expect(200, function (err, res) {
          assert(res.body.id, 'must have an access token');
          userId = res.body.userId;
          accessToken = res.body.id;
          json('delete', '/api/AuthUsers/' + userId +
            '?access_token=' + accessToken)
            .expect(204, done);
        });
    });

    it('should get all domains', function (done) {
      json('get', '/api/AuthUsers/' + dummyUserId + '/domains?access_token=' + accessToken)
        .expect(200, function (err, res) {
          assert(Array.isArray(res.body), 'should return array of domains');
          done();
        });
    });

    it('should reject a not valid domain url', function (done) {
      json('post', '/api/AuthUsers/' + userId + '/domains?access_token=' + accessToken)
        .send({
          "name": "friendly domain name",
          "url": "domain-name/somepath",
          "id": dummyDomainId
        })
        .expect(422, function (err, res) {
          //check if error validation code for url is present
          assert(Array.isArray(JSON.parse(res.error.text).error.details.codes.url), 'should return url validation error code');
          done();
        });
    });

    it('should create a domain', function (done) {
      json('post', '/api/AuthUsers/' + userId + '/domains?access_token=' + accessToken)
        .send({
          "name": "friendly domain name",
          "url": "www.domain-name.com/somepath",
          "id": dummyDomainId
        })
        .expect(200, done);
    });

    it('should get specific domain', function (done) {
      json('get', '/api/Domains/' + dummyDomainId + '?access_token=' + accessToken)
        .expect(200, done);
    });

    it('should update a domain', function (done) {
      json('put', '/api/Domains/' + dummyDomainId + '?access_token=' + accessToken)
        .send({
          "name": "new friendly domain name",
          "url": "www.domain-name.com/somepath/more"
        })
        .expect(200, done);
    });


    //TODO: un skip this test when the verify function is finished
    it.skip('should verify a domain', function (done) {
      json('post', '/api/Domains/' + dummyDomainId + '/verify?access_token=' + accessToken)
        .expect(200, function (err, res) {
          console.log(res.body);
          assert(!res.body.isVerified, 'meta tag must be present');
          done();
        });
    });

    it('should add a survey to domain', function (done) {
      json('post', 'api/Domains/' + dummyDomainId + '/surveys?access_token=' + accessToken)
        .send({
          "name": "Survey name",
          "question": "survey question?"
        })
        .expect(200, function (err, res) {
          if (err) console.log(err);
          done();
        });
    });

    it.skip('should get domain surveys', function (done) {
      console.log('api/AuthUsers/' + dummyDomainId + '/domains?filter={"include": ["surveys"]}&access_token=' + accessToken);
      json('get', 'api/AuthUsers/' + dummyDomainId + '/domains?filter={"include": ["surveys"]}&access_token=' + accessToken)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          assert(Array.isArray(res.body), 'should contain array of related surveys');
          done();
        });
    });

    it('should delete a domain', function (done) {
      json('delete', '/api/Domains/' + dummyDomainId + '?access_token=' + accessToken)
        .expect(204, done);
    });

  });

  */
  //describe('survey object CRUD', function () {
  //  before(function (done) {
  //    json('post', '/api/AuthUsers')
  //      .send({
  //        username: 'dummytestuser',
  //        password: 'dummytestuser',
  //        email: 'dummytestuser@test.com',
  //        id: dummyUserId
  //      })
  //      .expect(200, function (err, res) {
  //        if (err) {
  //          done(err);
  //        }
  //        json('post', '/api/AuthUsers/login')
  //          .send({
  //            username: 'dummytestuser',
  //            password: 'dummytestuser'
  //          })
  //          .expect(200, function (err, res) {
  //            assert(typeof res.body === 'object');
  //            assert(res.body.id, 'must have an access token');
  //            accessToken = res.body.id;
  //            done();
  //          });
  //      });
  //  });
  //
  //  after(function (done) {
  //    json('post', '/api/AuthUsers/login')
  //      .send({
  //        username: 'dummytestuser',
  //        password: 'dummytestuser'
  //      })
  //      .expect(200, function (err, res) {
  //        assert(res.body.id, 'must have an access token');
  //        userId = res.body.userId;
  //        accessToken = res.body.id;
  //        json('delete', '/api/AuthUsers/' + userId +
  //          '?access_token=' + accessToken)
  //          .expect(204, done);
  //      });
  //  });
  //});
  /*
  describe('Unexpected Usage', function () {
    it('should not crash the server when posting a bad id', function (done) {
      json('post', '/api/AuthUsers/foobar')
        .send({})
        .expect(404, done);
    });
  });
  */
});//End of Main API request.

/*
//Test for Referral app.
describe('Referral REST API request', function () {
  before(function (done) {
    require('./start-server');
    done();
  });

  after(function (done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });
  //Referral test
  describe("Adding a email", function(){
    it('should create new email', function (done) {
      json('post', '/api/ReferralUsers')
        .send({
          email: 'dummytestuser@test.com',
        })
        .expect(200, done);
      });
  });


});//End of test referral app.
*/
