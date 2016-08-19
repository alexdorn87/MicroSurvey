"use strict";
/**
 * This boot script defines custom Express routes not tied to models
 **/
//var path = require('path');

var tracker = require('../routes/tracker');
var template = require('../routes/template');
var trackerData = require('../routes/trackerData');
var surveyData = require('../routes/surveyData');
var user = require('../routes/users');

var homepage = require('../routes/homepage');
var referral = require('../routes/referral');
var tasks = require('../routes/tasks');
var email = require('../routes/email');
var screenshot = require('../routes/screenshot');

var privacy = require('../routes/privacy');
var terms = require('../routes/terms');

var choose_q1 = require('../routes/choose_q1');
var choose_q2 = require('../routes/choose_q2');
var edit_q3 = require('../routes/edit_q3');
var account_q4 = require('../routes/account_q4');
var install_q5 = require('../routes/install_q5');

var joinTeamExisting = require('../routes/joinTeamExisting');
var joinTeamNew = require('../routes/joinTeamNew');


module.exports = function(app) {
  var router = app.loopback.Router();
  var AuthUser = app.models.AuthUser;
  var AccessToken = app.models.AccessToken;

  /**
   * Create SurveyResponses
   */
  app.post('/api/tracker', tracker.createResponse);

  /**
   * Get all SurveyResponses
   */
  app.get('/api/tracker', tracker.getResponse);

  /**
   * Sends tracker data to the template
   * api/tracker/{userid}/{siteid}/{surveyid}
   */
  app.get('/api/tracker/:userId/:domainId/:surveyId', trackerData.getTrackerData);

  /**
   * Gets userid, domainid, surveyid for this uuid
   * api/tracker/:uuid
   */
  app.get('/api/tracker/uuid/:uuid', trackerData.getUUIDData);

  /**
   * Renders a template for the popup survey
   * /{userid}/{domainId}/template
   */
  app.get('/api/:userId/:domainId/:surveyId/template', template.sendTemplate);

  /**
   * Sends an email to with the passed data
   */
  app.post('/api/sendEmail', email.sendEmail);


  /**
   * Renders homepage index
   */
  app.get('/', homepage.checkCookies, homepage.index);


 /**
  * Renders privacy policy
  */
  app.get('/privacy', privacy.index);


  /**
   * Renders terms of use
   */
  app.get('/terms', terms.index);

  /**
   * Renders onBoarding Views
   */
  app.get('/choose_q1', choose_q1.index);
  app.get('/choose_q2', choose_q2.index);
  app.get('/edit_q3', edit_q3.index);
  app.get('/account_q4', account_q4.index);
  app.get('/install_q5', install_q5.index);

  /**
   * Add team process
   */
  app.get('/join/n/:id', joinTeamNew.index);
  app.get('/join/e/:id', joinTeamExisting.index);


  /**
   * Ref link route
   */
  app.get('/r/:ref', referral.shortURL);


  /**
   * Renders (referral system)
   */
  app.post('/referrals', referral.index);

  /**
   * If referrals accessed directly, go back to home
   */
  app.get('/referrals', function(req, res) {
    res.redirect("/");
  });


  app.post('/api/get-survey', template.getSurvey);

  app.post('/api/screenshot', screenshot.capture);


  /**
   * Completes a task by name
   */
  app.post('/referrals/:refId/tasks/:taskName/complete', tasks.complete);


  app.post('/api/Surveys/:id/updateMinimizeCount', surveyData.updateMinimizeCount);

  /**
   * Show password reset form
   */
    //reset the user password
  app.post('/reset-password', function(req, res, next) {
    console.log((req.body));
    console.log((req.headers));
    if (!req.body.accessToken) return res.sendStatus(401);

    //verify passwords match
    if (!req.body.password || !req.body.confirmation ||
      req.body.password !== req.body.confirmation) {
      return res.sendStatus(400, new Error('Passwords do not match'));
    }
    AccessToken.findById(req.body.accessToken, function (err, token) {
      if (err) return res.sendStatus(404);
      if (token == null) return res.sendStatus(404);
      AuthUser.findById(token.userId, function (err, user) {
        if (err) return res.sendStatus(404);
        user.updateAttribute('password', req.body.password, function (err, user) {
          if (err) return res.sendStatus(404);
          console.log('> password reset processed successfully');
          AccessToken.deleteById(req.body.accessToken, function (err, tokenDeleted) {
            if (err) return res.sendStatus(404);
            console.log('> token deleted successfully');
            res.json({
              reset: true,
              status: 'success'
            });
          });
        });
      });
    });

  });

  app.use(router);
};
