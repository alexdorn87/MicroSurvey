'use strict';

var _ = require('lodash');
var async = require('async');
var sleep = require('sleep');
var ac = require('./../active-campaign/active-api');

var ReferralEvent = function () {};

ReferralEvent.prototype.currentPosition = function (userEmail, positions){
  console.log('Referred by: ', userEmail);
  ac.sendPosition(userEmail, positions.currentIndex, 'current');
};

ReferralEvent.prototype.peopleAhead = function (userEmail, positions) {
  ac.sendPosition(userEmail, positions.peopleAhead, 'ahead');
};

ReferralEvent.prototype.peopleBehind = function (userEmail, positions){
  ac.sendPosition(userEmail, positions.peopleBehind, 'behind');
};

ReferralEvent.prototype.runActiveEvents = function (email, positions) {
  var self = this;
  async.series([
    function (callback){
    setTimeout(function(){
      self.currentPosition(email, positions, callback);
      callback(null, 'finished');
    }, 5000)
  },
  function (callback) {
    setTimeout(function(){
      self.peopleAhead(email, positions, callback);
      callback(null, 'finished');
    }, 5000)
  },
  function (callback){
    setTimeout(function(){
      self.peopleBehind(email, positions, callback);
      callback(null, 'finished');
    }, 5000)
  }
  ], function (err, results){
    if (err) console.error(err);
  });
};

module.exports = new ReferralEvent();
