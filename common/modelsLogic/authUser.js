"use strict";


module.exports = {};
module.exports.disableEndPoints = disableEndPoints;
module.exports.createUserWithDomain = createUserWithDomain;
module.exports.getAllRelatedInfo = getAllRelatedInfo;

function getAllRelatedInfo(userId, cb) {
  var app = require('../../server/server');
  var AuthUser = app.models.AuthUser;
  var Account = app.models.Account;
  var Team = app.models.Team;
  var Domain = app.models.Domain;

  var teamsIBelongTo,
      teamsIOwn,
      account;
  console.log('==========getAllRelatedInfo========', userId);
  AuthUser.findById(userId, function (err, user) {
    if (err) return cb(err);

    console.log('user id', user);
    Account.findOne({
      where: {
        userId: user.id
        }
      }, function (err, account) {
      if (err) return cb(err);
      console.log('===acount id:', account);
      Team.find({
        where: {
            accountId: account.id
          }
        }, function (err, teams) {
        if (err) return cb(err);
        console.log(teams);
        teamsIOwn = teams;

        user.teams(function (err, teamsIBelong) {
          if (err) return cb(err);
          teamsIBelongTo = teamsIBelong;
          var teamsIds = teamsIBelong.map(function (team) {
            return team.id
          });
          console.log('teamsIds', teamsIds);
          Domain.find({where: {teamsId: {inq: teamsIds}}}, function (err, domains) {
            if (err) return cb(err);
            return cb(null, {
              account: account,
              teamsIBelongTo: teamsIBelongTo,
              teamsIOwn: teamsIOwn,
              user: user,
              domains: domains
            })
          })
        })

      });
    });
  });
}

function createUserWithDomain(data, cb) {
  //console.log(req.params);
  var app = require('../../server/server');
  var AuthUser = app.models.AuthUser;
  var Account = app.models.Account;
  var Team = app.models.Team;
  var Domain = app.models.Domain;

  var body = data;
  console.log(body);
  //TODO: create user
  AuthUser.create({
    email: body.email,
    username: body.username || body.email,
    password: body.password
  }, function (err, user) {
    if (err) return cb(err);
    //TODO: create default account
    Account.create({
      userId: user.id,
      organizationName: 'user' + user.id + 'Org'
    }, function (err, account) {
      if (err) return cb(err);

      //TODO: create default team with account as owner
      Team.create({
        accountId: account.id,
        name: 'Default team'
      }, function (err, team) {
        if (err) return cb(err);
        console.log('default team created', team);

        //TODO: add created user to default team
        user.teams.add(team, function (err, teamAdded) {
          if (err) return cb(err);
          console.log('user added to team', teamAdded);

          //TODO: add domain to default team
          console.log('teamAdded.id', teamAdded.id);
          Domain.create({
            name: body.domainName,
            url: body.domainUrl,
            isVerified: false,
            teamsId: teamAdded.id
          }, function (err, domain) {
            if (err) return cb(err);
            team.domains.add(domain, function (err, domainAdded) {
              if (err) return cb(err);
              console.log('domain added to team', domain);
              return cb(null, {
                created: true,
                domain: domain,
                team: team,
                user: user,
                account: account
              });
            });
          });
        });
      });

    });
  });


  //Account.findById(ctx.instance.accountId, function (err, account) {
  //  if (err) return next(err);
  //  AuthUser.findById(account.userId, function (err, user) {
  //    if (err) return next(err);
  //    console.log(user);
  //    user.teams.add(ctx.instance, function (err, team) {
  //      if (err) return next(err);
  //      console.log('user added to team', team);
  //      console.log(team);
  //      return next();
  //    });
  //  });
  //});


}


function disableEndPoints(AuthUser) {
  AuthUser.disableRemoteMethod("updateAttributes", false);
  AuthUser.disableRemoteMethod("upsert", true);
  AuthUser.disableRemoteMethod("updateAll", true);
  AuthUser.disableRemoteMethod("delete", false);
  AuthUser.disableRemoteMethod("deleteById", true);

  AuthUser.disableRemoteMethod("count", true);
  AuthUser.disableRemoteMethod("exists", true);
  AuthUser.disableRemoteMethod("resetPassword", true);
  AuthUser.disableRemoteMethod("confirm", true);

  AuthUser.disableRemoteMethod("createChangeStream", true);

  AuthUser.disableRemoteMethod('__count__domains', false);
  AuthUser.disableRemoteMethod('__delete__domains', false);
  AuthUser.disableRemoteMethod('__destroyById__domains', false);

  AuthUser.disableRemoteMethod('__count__accessTokens', false);
  AuthUser.disableRemoteMethod('__create__accessTokens', false);
  AuthUser.disableRemoteMethod('__delete__accessTokens', false);
  AuthUser.disableRemoteMethod('__destroyById__accessTokens', false);
  AuthUser.disableRemoteMethod('__findById__accessTokens', false);
  AuthUser.disableRemoteMethod('__get__accessTokens', false);
  AuthUser.disableRemoteMethod('__updateById__accessTokens', false);
}
