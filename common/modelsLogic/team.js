"use strict";

var app = require('../../server/server');
var lodash = require('lodash');
var fs = require('fs');
var ParameterizedSQL = require('loopback-connector').ParameterizedSQL;
var sequelize = require('../../server/dbtest');
var path = require('path');
var handlebars = require('handlebars');
var linkGenerator = require('../../modules/link-generator');

module.exports = {};
//setup
module.exports.getUsers = getUsers;
module.exports.inviteUser = inviteUser;


/**
 * Invite user to team by email
 * @param data -  {} with email and other data necessary
 * @param id - team id
 * @param cb
 */

function inviteUser(data, id, cb) {
  console.log("================inviteUser==============");
  console.log(id, data);
  var Email = app.models.Email;
  var AuthUser = app.models.AuthUser;
  var Invitation = app.models.Invitation;


  var templatePath = path.join(__dirname, '..', '..', 'server', 'templates', 'team-invitation-email-template.html');
  var template = fs.readFileSync(templatePath, "utf8");

  var link = "";

  var formHtmlString = "";

  AuthUser.findOne({
    where: {
      email: data.email
    }
  }, function (err, user) {
    if (err) return cb(err);
    console.log(user);
    if (user) { //send an existing user team join
      link = linkGenerator("/e/");
    } else {//send an new user team join
      link = linkGenerator("/n/");
    }
    console.log(link);
    formHtmlString = handlebars.compile(template)({
      firstName: "Diego",
      lastName: "Romero",
      teamName: "Team name",
      activationLink: link.compiled
    });

    var email = new Email({
      to: data.email,
      from: 'noreply@alex.io',
      subject: "alex.io team invitation",
      html: formHtmlString
    });

    email.send(function (err, mail) {
      if (err) return cb(err);
      console.log('email sent');
      console.log(mail);
      Invitation.create({
        uuid: link.params.uuid,
        email: data.email,
        teamId: data.id
      }, function (err, invitation) {
        if (err) return cb(err);
        if (invitation) {
          return cb(null, invitation || mail);
        }
      })
    });
  });
}

/**
 * Domain Verification
 * @param id {Number} - User id
 */
function getUsers(id, cb) {
  //get the app and take the Domain model otherwise we get undefined
  var ds = app.dataSources.postgresql;
  var Team = require('../../server/server').models.Team;
  console.log("==================== get user id:", id);
  var sql = new ParameterizedSQL("SELECT * FROM Authuserteam AUT, Authuser AUS WHERE AUT.authuserid = AUS.id AND AUT.teamid = ?;", [id]);
  var parametizedSQL = ds.connector.parameterize(sql);
  ds.connector.execute(parametizedSQL.sql, [id], function (err, users) {
    console.log(err, users);
    if (err) return cb(err);
    console.log("users");
    console.log(users);
    return cb(null, users);
  });



  //var Team = sequelize.models.team;
  //var AuthuserTeam = sequelize.models.authuserteam;
  //var Authuser = sequelize.models.authuser;
  //
  //AuthuserTeam.findAll().then(function (teams) {
  //  console.log('sequelize!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  //  //console.log(teams);
  //});


  //Team.findById(id, function (err, team) {
  //  if (err) return cb(err);
  //
  //  //console.log('team', team);
  //
  //  team.users(function (err, users) {
  //    if (err) return cb(err);
  //    //console.log('users', users);
  //    if (users) {
  //      return cb(null, users);
  //    } else {
  //      return cb(null, []);
  //    }
  //
  //  })
  //
  //});
}
