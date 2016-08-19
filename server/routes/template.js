"use strict";
module.exports.renderTemplate = renderTemplate;
module.exports.sendTemplate = sendTemplate;
module.exports.getSurvey = getSurvey;

var app = require('../server');
var fs = require("fs");
var path = require("path");
var request = require("superagent");
var handlebars = require('handlebars');
var urlUtils = require('./urlUtils');
var rangeCheck = require('range_check');

handlebars.registerHelper('input_name', function() {
  var inputName = handlebars.escapeExpression(this.name);
  inputName = inputName.toLowerCase().trim();
  return new handlebars.SafeString(inputName);
});

handlebars.registerHelper('render_letter_option', function(value) {
  var inputName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  return inputName[value];
});

handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) // Or === depending on your needs
    return opts.fn(this);
  else
    return opts.inverse(this);
});

handlebars.registerHelper('serve_static_image', function(img_name) {
  if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging')
    return '/lib/tracker/static/' + img_name;
  else
    return 'http://localhost:4000/assets/images/static/' + img_name;
});

var TrackerData = app.models.TrackerData;
var Domain = app.models.Domain;
var Survey = app.models.Survey;
function sendTemplate(req, res) {
  //TODO the links are hardcoded soon should be envars or other configs.
  var trackerDataUrl;
  if (process.env.NODE_ENV == 'staging')
    trackerDataUrl = "http://dev.alex.io:9000/api/tracker/" + req.params.userId + "/" + req.params.domainId + "/" + req.params.surveyId;
  else if (process.env.NODE_ENV == 'production')
    trackerDataUrl = "http://alex.io:3000/api/tracker/" + req.params.userId + "/" + req.params.domainId + "/" + req.params.surveyId;
  else
    trackerDataUrl = "http://localhost:3000/api/tracker/" + req.params.userId + "/" + req.params.domainId + "/" + req.params.surveyId;

  request
    .get(trackerDataUrl)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function(err, response) {
      if (err) return res.send(err);
      var source = response.body;
      source.surveyId = source.id;
      source.scaleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      source.emotionOptions = ['sad', 'neutral', 'happy'];
      //TODO: get the template dynamically
      var template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'template.html'), "utf8");
      var form = handlebars.compile(template);
      var formHtmlString = form(source);
      res.writeHead(200, {"Context-Type": "text/html"});
      res.write(formHtmlString);
      res.end();
    });
}

function renderTemplate() {
  console.log('template rendered');
}

function getSurvey(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var source = req.body.source;
  var device = req.body.device;
  var pageTarget = req.body.pageTarget.toLowerCase();
  var uuid = req.body.uuid;
  var domainId = req.body.domainId;
  var userId = req.body.userId;
  var countryCode = req.body.countryCode;

  Survey.find({
    //filter: {
    where: {
      domainId: domainId
    }
    //}
  }, function(err, surveys) {
    if (err) {
      return res.json(
        err
      )
    }
    var lbFilter = require('loopback-filters');
    //check survey status
    surveys = lbFilter(surveys, {
      where: {
        status: 'on'
      }
    });

    //check for page url targeting
    var targetedSurveys = lbFilter(surveys, {
      where: function(survey) {
        var or = [];
        survey.pageTargeting.forEach(function(filter) {
          //groups OR level
          var and = [];
          console.log('filter.group.rules', filter.group.rules);
          filter.group.rules.forEach(function(andFilter) {
            //and filters level
            var filterCode = andFilter.field.code;
            var condition = andFilter.condition;
            var andResult = false;
            if (!!condition) {//is condition is not undefined
              condition = condition.toLowerCase();

              //picks the correct filters method by name
              andResult = urlUtils[filterCode.toLowerCase()](pageTarget, condition);
              console.log('??????????????');
              console.log(filterCode, pageTarget, condition, andResult);
              and.push(andResult);
              console.log(and);
            }
          });
          console.log(and);
          var orResult = and.length > 0 ? and.every(function(a) {
            return a;
          }) : false;
          console.log('and',and);
          console.log('orResult',orResult);
          or.push(orResult);
        });
        var surveyPassed = or.some(function(o) {
          return o;
        });
        return surveyPassed;
      }
    });

    var today = new Date().getTime();
    var surveysInDate = targetedSurveys.filter(function(current) {
      var endDate = current.endDate ? new Date(current.endDate) : null;
      var startDate = current.startDate ? new Date(current.startDate) : null;
      var endDateCondition = (endDate && today <= endDate.getTime()) || endDate == null;
      var startDateCondition = (startDate && today >= startDate.getTime());
      return startDateCondition && endDateCondition ? true : false;
    });

    //check page filters
    var surveys2 = lbFilter(surveysInDate, {
      where: function(survey) {
        var or = [];
        survey.filters.forEach(function(filter) {
          //groups OR level
          var and = [];
          filter.group.rules.forEach(function(andFilter) {
            //and filters level
            var filterCode = andFilter.field.code;
            var condition = andFilter.condition;
            var andResult = false;
            if (!!condition && filterCode != "COOKIE") {//is condition is not undefined

              if (filterCode == 'DEVICE') {
                andResult = condition == device;
              }

              if (filterCode == 'SOURCE') {
                andResult = condition == source;
              }

              if (filterCode == 'IP') {
                if (rangeCheck.validIp(ip) && rangeCheck.validIp(condition.lower) && rangeCheck.validIp(condition.upper)) {
                  andResult = rangeCheck.inRange(ip, [condition.lower, condition.upper]);
                }
              }
              if (filterCode == 'LOCCON') {
                andResult = condition.toLowerCase() === countryCode.toLowerCase();
              }

              if (filterCode == 'LANG' || filterCode == 'VIS') {
                //this is checked on client so we just pass
                andResult = true;
              }

              and.push(andResult);
            }
          });
          if (and.length > 0) {
            var orResult = and.every(function(a) {
              return a === true;
            });
            or.push(orResult);
          }
        });
        var surveyPassed = or.some(function(o) {
          return o;
        });
        return surveyPassed;
      }
    });
    var selectedSurvey = surveys2[0];
    res.json(
      selectedSurvey
    )
  });

}
