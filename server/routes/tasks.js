'use strict';

module.exports.complete = complete;
var app = require('../server');
var activeCampaign = require('../../active-campaign/active-api');
var ReferralUser = app.models.ReferralUser;

function complete(req, res) {
  var refId = req.params.refId;
  var taskName = req.params.taskName;

  ReferralUser.findOne(
    {
      where: {
        referralId: refId
      }
    },
    function (err, referralUser) {
      referralUser.tasks = referralUser.tasks || {};

      //mark task as done (true)
      if (!referralUser.tasks[taskName]) {
        referralUser.tasks[taskName] = true;
      }
      //Active Campaign api.
      activeCampaign.completeTaskCustom(referralUser.email, referralUser.tasks, referralUser.points);

      referralUser.save({ throws: false }, function (err, data) {
        ReferralUser.updatePoints(referralUser.email, function (err, saved) {
          if (err) console.log(err);
          //console.log(saved);
          res.end();
        });
      });
    });

}
