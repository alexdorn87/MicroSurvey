'use strict';

module.exports.index = referralPage;
module.exports.shortURL = shortURL;

//For active campaign API.
var activeCampaign = require('../../active-campaign/active-api');
var activeEvents = require('../../active-campaign/referral-events');

var app = require('../server');
var _ = require('lodash');
var ReferralUser = app.models.ReferralUser;
var cc = require('coupon-code');
var ccOpts = { parts: 1, partLen: 4 };
var Handlebars = require('handlebars');

Handlebars.registerHelper('compare', function (lvalue, rvalue, options) {

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || '==';

  var operators = {
    '==': function (l, r) {
      return l == r;
    },

    '===': function (l, r) {
      return l === r;
    },

    '!=': function (l, r) {
      return l != r;
    },

    '<': function (l, r) {
      return l < r;
    },

    '>': function (l, r) {
      return l > r;
    },

    '<=': function (l, r) {
      return l <= r;
    },

    '>=': function (l, r) {
      return l >= r;
    },

    typeof: function (l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

function referralPage(req, res) {
  var referralId = req.body.referralId;
  var refEmail = req.body.email;
  if (req.body.email && validateEmail(req.body.email) || (req.body.registered)) {
    ReferralUser.findOne(
      {
        where: {
          email: req.body.email
        }
      },
      function (err, referralUser) {
        //console.log(referralUser);
        //Not found
        if (!referralUser) {
          //register the user in the beta list and send them back to homepage
          var betaUser = {};
          betaUser.isNewSignUp = true;
          betaUser.email = req.body.email;
          betaUser.referralId = cc.generate(ccOpts);

          //Set cookie for new user.
          res.cookie('alexioRef', betaUser.referralId, {maxAge: 90000});
          //active campaign API add contact and event to the new contact.
          activeCampaign.addContactAC(betaUser.email, betaUser.referralId);

          betaUser.referral = (referralId) ? referralId : null;
          
          ReferralUser.create(betaUser, function (response) {
            //beta user is registered, redirect to home
            //before going home update our referrer points
            if (referralId) {
              ReferralUser.findOne({
                where: {
                  referralId: referralId
                }
              }, function(err, user) {
                ReferralUser.updatePoints(user.email, function (err, saved, refUser) {
                  if(err) console.log('Update error: ', err);
                  console.log('points updated:', saved)
                  //Atcive Campiagn api calls.
                  activeCampaign.activePointsAdded(refUser.email, refUser.points | 0);
                  retrievePosition_Send(refUser);
                  //Redirect to referral page with info.
                  ReferralUser.findOne({
                    where:{
                      email: betaUser.email
                    }
                  }, function(err, user){
                    if(err) console.log(err);
                    betaUser.registered = user.registered;
                    showReferralPage(res, betaUser);
                  });
                });
              });
            } else {
              ReferralUser.findOne({
                where:{
                  email: betaUser.email
                }
              }, function(err, user){
                if(err) console.log(err);
                betaUser.registered = user.registered;
                showReferralPage(res, betaUser);
              });
            }
          });

          //found a prior user.
        } else {
          ReferralUser.countPoints(referralUser.email, function (err, refPoints) {
            if (err) console.error(err);

            //Set cookie for recuring user.
            res.cookie('alexioRef', referralUser.referralId, {maxAge: 900000});

            referralUser.isNewSignUp = false;
            showReferralPage(res, referralUser, refPoints);
          });
        }
      }
    );
  } else {
    res.render('index', {
      referralId: req.query.ref,
      errorMessage: 'No valid email found'
    });
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

function shortURL(req, res) {
  var validated = cc.validate(req.params.ref, ccOpts);
  console.log(validated);
  if (validated) {
    res.redirect('/?ref=' + req.params.ref);
  } else {
    res.redirect('/');
  }
}

function showReferralPage(res, refUser, refPoints) {
  var totalReferred = 0;
  var totalReferredPct = 0;
  var totalPercent = 0;

  var referredId = refUser.referral;
  var isNew = refUser.isNewSignUp;
  var signUpDate = refUser.registered;

  //Check if refpoints is null or not.
  if (refPoints != null) {
    totalReferred = refPoints.totalPoints;
    totalReferredPct = refPoints.taskCount;
    totalPercent = refPoints.totalPercent;
  }


  ReferralUser.find({
        order: ['points DESC', 'registered ASC'],
        fields: {
          points: true,
          email: true
        }
      }, function(err, allUsers) {
        var pos = _.findIndex(allUsers, function(user) {
          return user.email == refUser.email;
        });

        // add 1, because is 0 based index
        pos = pos + 1;
        var posBehind = allUsers.length - pos;
        var posAhead = pos - 1;

        var allTaskComplete = (totalReferredPct > 1.00) ? true : false;

        res.render('referrals', {
          user: refUser,
          position: pos,
          positionsAhead: posAhead,
          positionsBehind: posBehind,
          totalReferred: totalReferred | 0,
          totalReferredPct: totalReferredPct | 0,
          totalPercent: totalPercent,
          allTaskComplete: allTaskComplete,
          isNewSignUp : isNew,
          signUpDate : signUpDate,
          referredId : referredId
        });
      });
}

 function retrievePosition_Send(referralUser) {
    var positions = {
      currentIndex: 0,
      peopleAhead: 0,
      peopleBehind: 0
    };

  ReferralUser.find({
      order: ['points DESC', 'registered ASC'],
      fields: {
        points: true,
        email: true
      }
    }, function (err, AllUsers) {
      positions.currentIndex = _.findIndex(AllUsers, function(user) {
        return user.email == referralUser.email;
      });

      positions.currentIndex = positions.currentIndex + 1;
      positions.peopleAhead = ((positions.currentIndex - 1) == -1) ? 0 : positions.currentIndex - 1 ;
      positions.peopleBehind = AllUsers.length - positions.currentIndex;

      activeEvents.runActiveEvents(referralUser.email, positions);
    });

 }
