"use strict";
var app = require('../server');
var referral = require('../routes/referral');
var ReferralUser = app.models.ReferralUser;
module.exports.index = index;
module.exports.checkCookies = checkCookies;

function index(req, res) {
    res.render('index', {
      referralId: req.query.ref
    });
}


//Checking for email cookies..
function checkCookies(req, res, next) {
  //Check if there is cookie..
  if (req.cookies['alexioRef'] != null) {
    ReferralUser.findOne({
      where: {
        referralId: req.cookies['alexioRef']
      }
    }, function(err, user) {
      if (err) console.error(err);
      req.body = {
        email: user.email,
        referralId: req.query.ref
      };
      //Go to referral page.
      res.render('index', {
        referralId: req.query.ref,
        alreadyRegistered: true,
        email: user.email
      });
    });
  } else {
    //Jump to next found no cookies..
    next();
  }
}
