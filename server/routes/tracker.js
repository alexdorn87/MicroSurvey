"use strict";
module.exports.createResponse = createResponse;
module.exports.getResponse = getResponse;

var app = require('../server');
var SurveyResponse = app.models.SurveyResponse;
var Domain = app.models.Domain;

/**
 *
 * Creates SurveyResponse by passing the domainId, surveyId and answers
 *
 */
function createResponse(req, res) {
  //todo: check if the domain is verified
  Domain.findById(req.body.domainId, function(err, domain) {
    if (err) return res.send(err);

    console.log("domain exists", domain);
    //hasMany surveys dynamic method
    domain.surveys.findById(req.body.surveyId, function(err, survey) {
      if (err) {
        console.log(err);
        return res.send(err)
      }

      console.log("survey exists", survey);
      //hasMany surveyResponses dynamic method
      survey.surveyResponses.create({
        referrer: req.body.referrer,
        domainId: req.body.domainId,
        surveyId: req.body.surveyId,
        response: req.body.response,
        timeToResponse: req.body.timeToResponse
      }, function(err, surveyResponse) {
        if (err) {
          console.log(err);
          return res.send(err)
        }

        console.log("surveyResponse", surveyResponse);
        res.send(surveyResponse);
      });
    });
  });
}

/**
 *
 * Display all SurveyResponses
 *
 */
function getResponse(req, res) {
  SurveyResponse.find(function(err, surveys) {
    if (err) return res.send(err);
    res.json(surveys);
  });
}
