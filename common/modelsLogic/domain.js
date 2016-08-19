"use strict";

var app = require('../../server/server');
var http = require('http');
var request = require('superagent');
var cheerio = require('cheerio');
var moment = require('moment');
var lodash = require('lodash');
module.exports = {};
//setup
module.exports.disableEndPoints = disableEndPoints;
module.exports.domainValidations = domainValidations;
module.exports.miniGraphData = miniGraphData;
//custom endpoints
module.exports.verify = verify;

/**
 * Domain Verification
 * @param id {Number} - Domain id
 * @param uuid {String} - Domain uuid
 * @param cb {Function} - Callback function
 */
function verify(id, uuid, cb) {
  //get the app and take the Domain model otherwise we get undefined
  var Domain = require('../../server/server').models.Domain;
  var verified = false;

  Domain.findById(id, function (err, domain) {
    if (err) return cb(err);
    var url = domain.url;

    console.log('domain handshake');
    //domain handshake
    request
      .get(url)
      .end(function (err, res) {
        if (err) cb(err);

        var $ = cheerio.load(res.text, {normalizeWhitespace: true});
        var scripts = [];
        var isScriptPresent = false;
        $('script[type="text/javascript"]').each(function (i, elem) {
          var scriptCode = $(this).text();
          scripts[i] = scriptCode;
          console.log('uuid', uuid);
          if (scriptCode.indexOf(uuid) > 0) {
            isScriptPresent = true;
          }
        });

        console.log('isScriptPresent', isScriptPresent);

        if (isScriptPresent) {
          verified = true;
          domain.updateAttributes({isVerified: verified}, function (err, instance) {
            if (err) return cb(err);

            cb(null, verified);
          });
        } else {
          cb(null, verified);
        }
      });
  });
}

function miniGraphData(id, surveyId, cb) {
  var Survey = app.models.Survey;
  var SurveyResponse = app.models.SurveyResponse;
  var SurveyView = app.models.SurveyView;

  Survey.findById(surveyId, function(err, survey) {
    if (err) return cb(err);
    var result = { views: { data: [0], labels:['x']}, responses:{ data: [0], labels:['x']} };
    //create a view record for the graph
    SurveyResponse.find({where: {
      surveyId: survey.id,
      domainId: survey.domainId
    }}, function (err, responses) {
      if (err) return cb(err);
      //console.log(err, responses);
      var tempObj = {};
      lodash.forEach(responses, function (s) {
        if (!s.createdAt) return false;
        var dayLabel = moment(s.createdAt).format('YYYY-MM-DD');
        tempObj[dayLabel] = tempObj[dayLabel] ? tempObj[dayLabel] + 1 : 1;
      });
      lodash.forEach(tempObj, function (val, key) {
        result.responses.data.push(val);
        result.responses.labels.push(key);
      });
      console.log('survey.id', survey.id);
      //create a view record for the graph
      SurveyView.find({where: {
        surveyId: survey.id,
        domainId: survey.domainId
      }}, function(err, views) {
        if (err) cb(err);
        var tempObj = {};
        console.log(views);
        lodash.forEach(views, function (s) {
          if (!s.createdAt) return false;
          var dayLabel = moment(s.createdAt).format('YYYY-MM-DD');
          tempObj[dayLabel] = tempObj[dayLabel] ? tempObj[dayLabel] + 1 : 1;

        });
        lodash.forEach(tempObj, function (val, key) {
          result.views.data.push(val);
          result.views.labels.push(key);
        });
        //console.log(result);
        cb(null, result);
      });

    });

  });
}


function disableEndPoints(Domain) {
  Domain.disableRemoteMethod("createChangeStream", true);
  Domain.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream
  Domain.disableRemoteMethod("count", true);
  Domain.disableRemoteMethod("exists", true);
  Domain.disableRemoteMethod("findOne", true);
}

//validations setup
function domainValidations(Domain) {
  urlValidation(Domain);
}

/**
 * Check if url is valid
 * @param Domain Model
 */
function urlValidation(Domain) {
  var validator = require('validator');

  //custom validation for url
  Domain.validate('url', validateUrl, {message: 'Must provide a valid url'});

  function validateUrl(err) {
    if (!validator.isURL(this.url)) {
      err()
    }
  }
}
