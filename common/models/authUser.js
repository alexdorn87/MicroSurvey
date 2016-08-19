"use strict";

var disableEndPoints = require('../modelsLogic/authUser').disableEndPoints;
var createUserWithDomain = require('../modelsLogic/authUser').createUserWithDomain;
var getAllRelatedInfo = require('../modelsLogic/authUser').getAllRelatedInfo;


module.exports = function(AuthUser) {

  AuthUser.createUserWithDomain = createUserWithDomain;

  /**
   * Create user + default account + default team + add domain if present
   * this should only be user when creating a new user
   */
  AuthUser.remoteMethod(
    //method name `AuthUser.createUserWithDomain`
    'createUserWithDomain',
    //method definition
    {
      description: 'Create a user with domain info',
      accepts: [{ arg: 'data', type: 'object', http: { source: 'body' } }],
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'post', path: '/createUserWithDomain'}
    }
  );

  AuthUser.getAllRelatedInfo = getAllRelatedInfo;

  AuthUser.remoteMethod(
    //method name `AuthUser.getAllRelatedInfo`
    'getAllRelatedInfo',
    //method definition
    {
      description: 'Get all user info with teams, accounts and domains',
      accepts: [{ arg: 'userId', type: 'number' }],
      returns: {arg: 'data', type: 'object'},
      http: {verb: 'get', path: '/:userId/getAllRelatedInfo'}
    }
  );

  //disableEndPoints(AuthUser);
  AuthUser.on('resetPasswordRequest', function(info) {
    var url = 'http://localhost:4000/#/reset-password';
    //var url = 'http://alex.io/dashboard/#/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';
    var Email = AuthUser.app.models.Email;
    Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //Create an account entry for each newly created user
  //AuthU ser.observe('after save', function filterProperties(ctx, next) {
  //  var app = AuthUser.app;
  //  var Account = app.models.Account;
  //  console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
  //  console.log('ctx.extraData',ctx.extraData);
  //  if (ctx.isNewInstance) {
  //    Account.create({
  //      userId: ctx.instance.id,
  //      organizationName: 'user' + ctx.instance.id + 'Org'
  //    }, function(err, obj) {
  //      if (err) return next(err);
  //      return next();
  //    });
  //  } else {
  //    return next();
  //  }
  //});

  //Create an account entry for each newly created user
  //AuthUser.observe('before save', function filterProperties(ctx, next) {
  //  console.log('before save user', ctx);
  //  ctx.extraData = {};
  //  ctx.extraData.domainName = ctx.instance.domainName;
  //  ctx.extraData.domainUrl = ctx.instance.domainUrl;
  //  console.log(ctx.instance);
  //  next();
  //});


};
