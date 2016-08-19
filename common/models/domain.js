"use strict";

var disableEndPoints = require('../modelsLogic/domain').disableEndPoints;
var domainValidations = require('../modelsLogic/domain').domainValidations;
var verify = require('../modelsLogic/domain').verify;
var miniGraphData = require('../modelsLogic/domain').miniGraphData;

//var TrackerData = require('../../server').models.TrackerData;

module.exports = function(Domain) {

  //setup domain validations, remove unnecessary endpoints
  //disableEndPoints(Domain);
  //domainValidations(Domain);

  /**
   * Domain Verification
   */
  Domain.verify = verify;

  //Register Endpoint under Domain model
  Domain.remoteMethod(
    //method name `Domain.verify`
    'verify',
    //method definition
    {
      description: 'Verify domains',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'id',
          type: 'number',
          required: true,
          description: 'Domain id to verify'
        },
        {
          //Domain uuid passed on the query
          arg: 'uuid',
          type: 'string',
          required: true,
          description: 'Domain uuid to verify'
        }
      ],
      returns: {arg: 'isVerified', type: 'boolean'},
      http: {verb: 'post', path: '/:id/verify'}
    }
  );

  Domain.miniGraphData = miniGraphData;

  //Register Endpoint under Domain model
  Domain.remoteMethod(
    //method name `Survey.miniGraphData`
    'miniGraphData',
    //method definition
    {
      description: 'Get all mini graph data for this survey',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'id',
          type: 'string',
          required: true,
          description: 'domain id.'
        },
        {
          //Domain id passed on the query
          arg: 'surveyId',
          type: 'string',
          required: true,
          description: 'Survey id.'
        }
      ],
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'get', path: '/:id/miniGraphData'}
    }
  );


  //Create a tracker data entry for each newly created domain
  Domain.observe('after save', function filterProperties(ctx, next) {
    var app = Domain.app;
    var TrackerData = app.models.TrackerData;
    var Team = app.models.Team;
    console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
    if (ctx.isNewInstance) {
      console.log(ctx.instance);
      Team.findOne({filter: {where: {domainId: ctx.instance.id}}}, function (err, team) {
        if (err) return next(err);
        TrackerData.create({
          domainId: ctx.instance.id,
          teamId: team.id
        }, function(err, obj) {
          if (err) return next(err);

          console.log('trackerdata created:',obj);
          next(null, obj);
        });
      });
    } else {
      next();
    }
  });

};
