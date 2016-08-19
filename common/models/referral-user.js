"use strict";

var referralLogic = require('../modelsLogic/referralUser');

var countAhead = referralLogic.countAhead;

var countReferred = referralLogic.countReferred;
var countPoints = referralLogic.countPoints;
var updatePoints = referralLogic.updatePoints;


module.exports = function(ReferralUser) {
  /**
   * Count ahead people on the waiting list
   */
  ReferralUser.countAhead = countAhead;

  //Register Endpoint under Domain model
  ReferralUser.remoteMethod(
    //method name `Domain.countAhead`
    'countAhead',
    //method definition
    {
      description: 'Count people ahead on the waiting list',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'referralId',
          type: 'string',
          required: true,
          description: 'Beta user referralId.'
        }
      ],
      returns: {arg: 'ahead', type: 'number'},
      http: {verb: 'post', path: '/:referralId/countAhead'}
    }
  );


  /**
   * Count ahead people on the waiting list
   */
  ReferralUser.countReferred = countReferred;

  //Register Endpoint under Domain model
  ReferralUser.remoteMethod(
    //method name `Domain.countReferred`
    'countReferred',
    //method definition
    {
      description: 'Count people referred by this beta referralId user',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'referralId',
          type: 'string',
          required: true,
          description: 'Beta user referralId.'
        }
      ],
      returns: {arg: 'referred', type: 'number'},
      http: {verb: 'post', path: '/:referralId/countReferred'}
    }
  );

  /**
   * Count ahead people on the waiting list
   */
  ReferralUser.countPoints = countPoints;

  //Register Endpoint under Domain model
  ReferralUser.remoteMethod(
    //method name `Domain.countReferred`
    'countPoints',
    //method definition
    {
      description: 'Count beta user points (tasks and referred people)',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'email',
          type: 'string',
          required: true,
          description: 'Beta user email.'
        }
      ],
      returns: {arg: 'points', type: 'number'},
      http: {verb: 'get', path: '/:email/countPoints'}
    }
  );

  /**
   * Count ahead people on the waiting list
   */
  ReferralUser.updatePoints = updatePoints;

  //Register Endpoint under Domain model
  ReferralUser.remoteMethod(
    //method name `Domain.countReferred`
    'updatePoints',
    //method definition
    {
      description: 'update beta user points (tasks and referred people)',
      accepts: [
        {
          //Domain id passed on the query
          arg: 'email',
          type: 'string',
          required: true,
          description: 'Beta user email.'
        }
      ],
      returns: {arg: 'saved', type: 'boolean'},
      http: {verb: 'post', path: '/:email/updatePoints'}
    }
  );
};
