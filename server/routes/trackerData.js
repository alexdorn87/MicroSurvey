"use strict";
module.exports.getTrackerData = getTrackerData;
module.exports.getUUIDData = getUUIDData;

var utils = require('./urlUtils');
var app = require('../server');
var TrackerData = app.models.TrackerData;
var Survey = app.models.Survey;


/**
 * '/api/tracker/:userId/:domainId/:surveyId'
 * @param req
 * @param res
 */
function getTrackerData(req, res) {
  console.log(req.params);
  Survey.findOne({
    where: {
      id: req.params.surveyId,
      domainId: req.params.domainId
    }
  }, function(err, survey) {
    if (err) return res.send(err);
    if (!!survey) {
      survey.domain(function(err, domain) {
        if (err) return res.send(err);
        domain.authUser(function(err, user) {
          if (err) return res.send(err);
          survey.authUserId = user.id;
          res.json(survey);
        })
      });
    } else {
      res.send({message: 'No survey found'});
    }
  });

}

/**
 * /api/tracker/:uuid
 * @param req
 * @param res
 */
function getUUIDData(req, res) {
  TrackerData.findOne({where: {uuid: req.params.uuid}}, function(err, instance) {
    //get ip from requesting client and send it back to tracker to apply filters
    if (err) return res.send(err);
    //include survey filters data
    console.log(JSON.stringify(instance));
    if (instance) {
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('ip', ip);
      //if(ip != '127.0.0.1'){
      //  utils.getCountry(ip, function(err, countryObj) {
      //    res.json({
      //      exists: true,
      //      domainId: instance.domainId,
      //      userId: instance.authUserId,
      //      countryCode: countryObj ? countryObj.country_code : ''
      //    });
      //  });
      //}else{
        res.json({
          exists: true,
          domainId: instance.domainId,
          userId: instance.authUserId,
          countryCode: ''
        });
      //}
    } else {
      res.json({
        exists: false
      });
    }
  });
}
