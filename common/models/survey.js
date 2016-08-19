"use strict";

var disableEndPoints = require('../modelsLogic/survey').disableEndPoints;
var updateViewCount = require('../modelsLogic/survey').updateViewCount;
var updateVisitCount = require('../modelsLogic/survey').updateVisitCount;
var updateMinimizeCount = require('../modelsLogic/survey').updateMinimizeCount;
var getSummaryData = require('../modelsLogic/survey').getSummaryData;

var pubsub = require('../../server/pubsub.js');

module.exports = function(Survey) {

  disableEndPoints(Survey);


  Survey.updateViewCount = updateViewCount;

  //Register Endpoint under Survey model
  Survey.remoteMethod(
    //method name `Survey.updateViewCount`
    'updateViewCount',
    //method definition
    {
      description: 'Update Survey view Count',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'id',
          type: 'string',
          required: true,
          description: 'Survey id.'
        }
      ],
      returns: {arg: 'updated', type: 'boolean'},
      http: {verb: 'post', path: '/:id/updateViewCount'}
    }
  );


  Survey.updateVisitCount = updateVisitCount;

  //Register Endpoint under Survey model
  Survey.remoteMethod(
    //method name `Survey.updateVisitCount`
    'updateVisitCount',
    //method definition
    {
      description: 'Update Survey visit Count',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'id',
          type: 'string',
          required: true,
          description: 'Survey id.'
        }
      ],
      returns: {arg: 'updated', type: 'boolean'},
      http: {verb: 'post', path: '/:id/updateVisitCount'}
    }
  );

  //Survey.updateMinimizeCount = updateMinimizeCount;
  //
  ////Register Endpoint under Survey model
  //Survey.remoteMethod(
  //  //method name `Survey.updateMinimizeCount`
  //  'updateMinimizeCount',
  //  //method definition
  //  {
  //    description: 'Update Survey minimize Count',
  //    accepts: [
  //      {
  //        //Domain id passed on the query
  //        arg: 'id',
  //        type: 'string',
  //        required: true,
  //        description: 'Survey id.'
  //      }
  //    ],
  //    returns: {arg: 'updated', type: 'boolean'},
  //    http: {verb: 'post', path: '/:id/updateMinimizeCount'}
  //  }
  //);

  Survey.getSummaryData = getSummaryData;

  //Register Endpoint under Domain model
  Survey.remoteMethod(
    //method name `Survey.getSummaryData`
    'getSummaryData',
    //method definition
    {
      description: 'Get all summary graph data for this survey',
      accepts: [
        {
          //Survey id passed on the query
          arg: 'id',
          type: 'string',
          required: true,
          description: 'Survey id.'
        }
      ],
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'get', path: '/:id/getSummaryData'}
    }
  );


  //Survey after save..
  Survey.observe('after save', function (ctx, next) {
    var socket = Survey.app.io;
    if (ctx.isNewInstance) {
      //Now publishing the data..
      pubsub.publish(socket, {
        collectionName: 'Survey',
        data: ctx.instance,
        method: 'POST'
      });
    } else {
      console.log('after update survey,,,,,');
      //Now publishing the data..
      pubsub.publish(socket, {
        collectionName: 'Survey',
        data: ctx.instance,
        modelId: ctx.instance.id,
        method: 'PUT'
      });
    }
    //Calling the next middleware..
    next();
  }); //after save..

};
