"use strict";

var disableEndPoints = require('../modelsLogic/survey-response').disableEndPoints;
var handlebars = require('handlebars');
var fs = require("fs");
var path = require("path");
var bot = require('../../server/slackBot');
//handlebars.registerPartial('response-template', fs.readFileSync(path.join(__dirname, '..', '..', 'server', 'templates', 'response-template.html'), 'utf8'));
var botParams = {
  icon_emoji: ':cat:'
};


module.exports = function (SurveyResponse) {
  disableEndPoints(SurveyResponse);

  //Update survey response count when survey response is submitted and saved
  SurveyResponse.observe('after save', function filterProperties(ctx, next) {
    var app = SurveyResponse.app;
    var Email = app.models.Email;
    var Survey = app.models.Survey;
    var Domain = app.models.Domain;
    var AuthUser = app.models.AuthUser;
    var Notifications = app.models.Notifications;

    if (ctx.isNewInstance) { //if new response

      bot.postMessageToChannel('logs', '```' + JSON.stringify(ctx.instance, null, 2) + '```', botParams, function (data) {
        console.log(data);
      });

      Survey.findById(ctx.instance.surveyId, function (err, survey) {
        if (err) return next(err);

        survey.responseCount = survey.responseCount || 0;
        survey.responseCount += 1;

        console.log('survey');
        console.log(survey);

        survey.save(function () {
          console.log('err', err);
          console.log('saved');

          Domain.findById(ctx.instance.domainId, function (err, domain) {
            if (err) return next(err);

            AuthUser.findById(domain.authUserId, function (err, user) {
              if (err) return next(err);

              var template = fs.readFileSync(path.join(__dirname, '..', '..', 'server', 'templates', 'base-email-template.html'), "utf8");
              var compiledTemplate = handlebars.compile(template);
              var formHtmlString = compiledTemplate({
                surveyName: survey.name,
                surveyId: survey.id,
                domainName: domain.name,
                domainId: domain.id,
                email: user.email
              });

              var email = new Email({
                to: user.email,
                from: 'noreply@alex.io',
                subject: "New response for survey: " + survey.name + " on domain: " + domain.name,
                html: formHtmlString
              });

              //if notifications are enabled
              if (user.notifications && user.notifications['alexio-email-updates']) {
                email.send(function (err, mail) {
                  if (err) return next(err);

                  next();
                });
              }

              //Notifications.findOne({where: {key: 'alexio-email-updates'}}, function (err, notification) {
              //  if (err) return next(err);
              //  if (notification.enabled) {

                //} else {
                //  next();

              //});


            })
          });

        });
      });
    } else {
      next();
    }
  });
};
