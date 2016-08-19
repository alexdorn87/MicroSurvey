"use strict";

var app = require('../../server/server');
var SurveyResponse = app.models.SurveyResponse;
module.exports = {};
module.exports.disableEndPoints = disableEndPoints;
module.exports.createResponse = createResponse;

function createResponse(req, cb) {
  //require model
  var SurveyResponse = require('../../server/server').models.SurveyResponse;
  SurveyResponse.create();
}

function disableEndPoints(SurveyResponse) {
  SurveyResponse.disableRemoteMethod("updateAll", true);
  SurveyResponse.disableRemoteMethod("updateAttributes", false);
  SurveyResponse.disableRemoteMethod("exists", true);
  SurveyResponse.disableRemoteMethod("createChangeStream", true);
  SurveyResponse.disableRemoteMethod("updateAttributes", false);
}
