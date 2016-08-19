"use strict";

var app = require('../../server/server');
var Survey = app.models.Survey;
var lodash = require('lodash');
var meanBy = require('lodash.meanby');
var moment = require('moment');
var extend = require('util')._extend;
require("moment-duration-format");

module.exports = {};
module.exports.disableEndPoints = disableEndPoints;
module.exports.updateViewCount = updateViewCount;
module.exports.updateVisitCount = updateVisitCount;
module.exports.updateMinimizeCount = updateMinimizeCount;
module.exports.getSummaryData = getSummaryData;

function disableEndPoints(Survey) {
  Survey.disableRemoteMethod("createChangeStream", true);
  Survey.disableRemoteMethod("count", true);
}

function updateViewCount(id, cb) {
  var Survey = app.models.Survey;
  var SurveyView = app.models.SurveyView;
  console.log('==================================');
  console.log('updateViewCount');
  console.log('==================================');
  Survey.findById(id, function (err, survey) {
    if (err) return cb(err);

    survey.viewCount = survey.viewCount || 0;
    survey.viewCount += 1;

    survey.save();

    //create a view record for the graph
    SurveyView.create({
      surveyId: survey.id,
      domainId: survey.domainId
    }, function (err, instance) {
      if (err) {
        return cb(err);
      }
      console.log('==================================');
      console.log('updateViewCount');
      console.log('==================================');
      return cb(null, true);
    });
  });
}

function updateVisitCount(id, cb) {
  var Survey = app.models.Survey;
  var SurveyVisit = app.models.SurveyVisit;
  console.log('==================================');
  console.log('updateVisitCount');
  console.log('==================================');
  Survey.findById(id, function (err, survey) {
    if (err) return cb(err);
    survey.visitCount = survey.visitCount || 0;
    survey.visitCount += 1;

    survey.save();

    //create a view record for the graph
    SurveyVisit.create({
      surveyId: survey.id,
      domainId: survey.domainId
    }, function (err, instance) {
      if (err) {
        return cb(err);
      }
      console.log('==================================');
      console.log('updateVisitCount');
      console.log('==================================');
      return cb(null, true);

    });
  });
}

function updateMinimizeCount(id, cb) {
  var Survey = app.models.Survey;
  var SurveyMinimize = app.models.SurveyMinimize;
  console.log('==================================');
  console.log('updateMinimizeCount');
  console.log('==================================');
  Survey.findById(id, function (err, survey) {
    if (err) return cb(err);
    survey.minimizeCount = survey.minimizeCount || 0;
    survey.minimizeCount += 1;

    survey.save();
    console.log('survey minize');
    //create a view record for the graph
    SurveyMinimize.create({
      surveyId: survey.id,
      domainId: survey.domainId
    }, function (err, instance) {
      if (err) {
        return cb(err);
      }
      console.log('==================================');
      console.log('updateMinimizeCount');
      console.log('==================================');
      return cb(null, true);

    });
  });
}

function getSummaryData(id, cb) {
  var Survey = app.models.Survey;
  var SurveyResponse = app.models.SurveyResponse;
  var SurveyView = app.models.SurveyView;
  var SurveyVisit = app.models.SurveyVisit;
  var SurveyMinimize = app.models.SurveyMinimize;

  console.log('==================================');
  console.log('getSummaryData');
  console.log('==================================');

  var totalVisits = 0;
  var totalViews = 0;

  var result = {
    donuts: {
      display: {percent: 0},
      engagement: {percent: 0},
      minimize: {percent: 0},
      responses: {percent: 0},
      timeToResponse: {average: 0}
    },
    summary: {
      display: [],
      engagement: [],
      minimize: [],
      responses: [],
      timeToResponse: []
    }
  };

  Survey.findById(id, function (err, survey) {
    if (err) return cb(err);
    //console.log(survey);
    var engagementTotal = (survey.responseCount + survey.minimizeCount) || 0; //response count + minimize count

    result.donuts.display.percent = (survey.viewCount / survey.visitCount) * 100;
    result.donuts.display.count = survey.viewCount;

    result.donuts.minimize.count = survey.minimizeCount;
    result.donuts.minimize.percent = (survey.minimizeCount / engagementTotal) * 100;


    result.donuts.responses.count = survey.responseCount;
    result.donuts.responses.percent = (survey.responseCount / engagementTotal) * 100;

    result.donuts.engagement.percent = (engagementTotal / survey.viewCount) * 100;
    result.donuts.engagement.count = engagementTotal;

    console.log('==================================');
    console.log('getSummaryData');
    console.log('==================================');
    //cb(null, result);
    //Get times a survey is visited by id
    SurveyResponse.find({ where: { surveyId: survey.id, domainId: survey.domainId } }, function (err, responses) {
      if (err) return cb(err);
      var tempObj = summarizeDateValues(responses);

      lodash.forEach(tempObj, function (val, key) {
        result.summary.responses.push({x: key, y: val});
      });

      //calculate average time to response
      var avgTimeToResponse = meanBy(responses, 'timeToResponse');

      result.donuts.timeToResponse.average = moment.duration(avgTimeToResponse, "milliseconds").format("mm:ss", { forceLength: true, trim: false });

      SurveyView.find({ where: { surveyId: survey.id } }, function (err, views) {
        if (err) cb(err);
        var tempObj = summarizeDateValues(views);
        lodash.forEach(tempObj, function (val, key) {
          result.summary.display.push({x: key, y: val});
        });

        SurveyMinimize.find({ where: { surveyId: survey.id } }, function (err, minimizes) {
          if (err) cb(err);

          var tempObj = summarizeDateValues(minimizes);
          lodash.forEach(tempObj, function (val, key) {
            result.summary.minimize.push({x: key, y: val});
          });

          result.summary.minimize = lodash.sortBy(result.summary.minimize, sortByGraphPoints);
          result.summary.display = lodash.sortBy(result.summary.display, sortByGraphPoints);
          result.summary.responses = lodash.sortBy(result.summary.responses, sortByGraphPoints);

          result.summary.engagement = result.summary.responses.map(function (current, index) {
            var yVal = result.summary.minimize[index] ? result.summary.minimize[index].y : 0;
            return {x: current.x, y: current.y + yVal};
          });

          cb(null, result);
        });
      });
    });

  });
}

function dayDifference(a, b) {
  return moment(a).startOf('day').diff(moment(b).startOf('day'), 'days') - 1;
}

function sortGraphPoints(a, b) {
  return moment(a.x) - moment(b.x);
}

function sortByGraphPoints(a) {
  return moment(a.x);
}

function addDateZeros(tempObj, currentDate, nextDate) {
  var objCopy = extend(tempObj, {});
  var dayDiff;
  dayDiff = dayDifference(nextDate, currentDate);
  var tempLabel = '';
  if (dayDiff > 1) {
    for (var i = 0; i < dayDiff; i++) {
      tempLabel = getEmptyDayLabel(currentDate, i + 1);
      if (!objCopy[tempLabel]) objCopy[tempLabel] = 0;
    }
  }
  return objCopy;
}

function getEmptyDayLabel(currentDate, i) {
  return moment(currentDate).add(i, 'days').format('YYYY-MM-DD');
}

function getDayLabel(createdAt) {
  return moment(createdAt).format('YYYY-MM-DD');
}

function summarizeDateValues(objectList) {
  var tempObj = {};
  var currentDate = null;
  lodash.forEach(objectList, function (obj) {
    if (!obj.createdAt) return false;
    var dayLabel = getDayLabel(obj.createdAt);

    if (currentDate) {
      tempObj = addDateZeros(tempObj, currentDate, obj.createdAt);
    }
    currentDate = obj.createdAt;
    tempObj[dayLabel] = tempObj[dayLabel] ? tempObj[dayLabel] + 1 : 1;
  });
  return tempObj;
}
function summarizeTimeToResponseValues(objectList) {
  var tempObj = {};
  var currentDate = null;
  lodash.forEach(objectList, function (obj) {
    if (!obj.createdAt) return false;
    var dayLabel = getDayLabel(obj.createdAt);

    if (currentDate) {
      tempObj = addDateZeros(tempObj, currentDate, obj.createdAt);
    }
    currentDate = obj.createdAt;
    var ttr = obj.timeToResponse ? obj.timeToResponse : 0;
    tempObj[dayLabel] = tempObj[dayLabel] ? tempObj[dayLabel] + ttr : ttr;
  });
  return tempObj;
}
