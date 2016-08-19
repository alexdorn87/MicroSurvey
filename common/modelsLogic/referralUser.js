'use strict';

var _ = require('lodash');

//For active campaign API.
var activeCampaign = require('../../active-campaign/active-api');

//custom endpoints
module.exports.countAhead = countAhead;
module.exports.countReferred = countReferred;
module.exports.countPoints = countPoints;
module.exports.updatePoints = updatePoints;

function countAhead(referralId, cb) {
  //get the app and take the Domain model otherwise we get undefined
  var ReferralUser = require('../../server/server').models.ReferralUser;
  ReferralUser.countReferred(referralId, function (count) {

  });
}

function countReferred(referralId, cb) {
  //get the app and take the Domain model otherwise we get undefined
  var ReferralUser = require('../../server/server').models.ReferralUser;
  ReferralUser.find({
      where: {
        referral: referralId
      }
    },
    function (err, referredUsers) {
      if (referredUsers) {
        cb(null, referredUsers.length);
      } else {
        cb(null, 0);
      }
    });
}

function countPoints(email, cb) {
  //get the app and take the Domain model otherwise we get undefined
  var ReferralUser = require('../../server/server').models.ReferralUser;
  ReferralUser.findOne({
      where: {
        email: email
      }
    },
    function (err, referredUser) {
      var referralPoints = {
        totalPoints: 0,
        taskCount: 0,
        refLength: 0,
        totalPercent: 0
      };

      //count tasks
      if (referredUser) {
        _.forEach(referredUser.tasks, function (val, key) {
          //console.log(key, val);
          if (val) {
            referralPoints.taskCount += 1;
          }
        });

        referralPoints.taskCount = Number((referralPoints.taskCount / 3).toFixed(2));

        ReferralUser.find({
          where: {
            referral: referredUser.referralId
          }
        }, function (err, referredUsers) {
          if (err) cb(err);

          //Compute referral's percentage and add together..
          referralPoints.refLength = referredUsers.length || 0;
          referralPoints.totalPoints = referralPoints.totalPoints + referralPoints.taskCount + referralPoints.refLength;
          referralPoints.totalPercent = ((referralPoints.totalPoints) / 20) * 100;
          referralPoints.totalPercent = (referralPoints.totalPercent > 99) ? 100 : referralPoints.totalPercent;

          cb(null, referralPoints);
        });
      } else {
        cb(null, 0);
      }
    });
}

function updatePoints(email, cb) {
  var ReferralUser = require('../../server/server').models.ReferralUser;
  countPoints(email, function (err, count) {
    if (err) cb(err);
    ReferralUser.findOne({
      where: {
        email: email
      }
    }, function (err, user) {
      if (err) cb(err, false);

      //user.points = Number(count);
      user.points = count.totalPoints;

      user.save({ throws: false }, function (err, data) {
        if (err) cb(err, false);
        cb(null, true, user);
      });
    });

  });
}
