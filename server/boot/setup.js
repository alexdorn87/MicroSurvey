"use strict";
/**
 * This boot script ensures that a user always exists
 **/

module.exports = function(app) {
  //var User = app.models.AuthUser;
  //var Domain = app.models.Domain;
  //var Survey = app.models.Survey;
  //var AccountType = app.models.AccountType;
  //var TrackerData = app.models.TrackerData;
  //
  //var users = [
  //  {
  //    username: 'diegofromero',
  //    firstName: 'diego',
  //    lastName: 'romero',
  //    email: 'romero.pozo2012@gmail.com',
  //    password: 'diegofromero',
  //    id: 1,
  //    accountTypeId: 1,
  //    domains: [
  //      {
  //        "name": "google",
  //        "url": "www.google.com",
  //        "id": 1
  //      },
  //      {
  //        "name": "google pe",
  //        "url": "www.google.com.pe",
  //        "id": 2
  //      }
  //    ]
  //  },
  //  {
  //    username: 'diegofromero2',
  //    firstName: 'diego',
  //    lastName: 'romero',
  //    email: 'romero.pozo20122@gmail.com',
  //    password: 'diegofromero2',
  //    id: 2,
  //    accountTypeId: 1,
  //    domains: [
  //      {
  //        "name": "google ve",
  //        "url": "www.google.com.ve",
  //        "id": 3
  //      },
  //      {
  //        "name": "google cl",
  //        "url": "www.google.com.cl",
  //        "id": 4
  //      }
  //    ]
  //  }
  //];
  //
  //var accountTypes = [
  //  {
  //    "type": "default",
  //    "name": "Default",
  //    "domainQty": 1,
  //    "users": users
  //  }
  //];
  //
  //var surveys = [
  //  {
  //    "name": "Purchase stopping reasons",
  //    "questions": [
  //      {
  //        "name": "What almost stopped you from completing your purchase?",
  //        "placeholder": "I've..."
  //      },
  //      {
  //        "name": "What almost stopped?",
  //        "placeholder": "I've..."
  //      },
  //      {
  //        "name": "What from completing your purchase?",
  //        "placeholder": "I've..."
  //      }
  //    ],
  //    "buttons": [
  //      {
  //        "name": "real button"
  //      }
  //    ],
  //    "domainId": 1
  //  },
  //  {
  //    "name": "fake Purchase stopping reasons",
  //    "questions": [
  //      {
  //        "name": "fake What almost stopped you from completing your purchase?",
  //        "placeholder": "I've..."
  //      },
  //      {
  //        "name": "fake What almost stopped?",
  //        "placeholder": "I've..."
  //      },
  //      {
  //        "name": "fake What from completing your purchase?",
  //        "placeholder": "I've..."
  //      }
  //    ],
  //    "buttons": [
  //      {
  //        "name": "fake button"
  //      }
  //    ],
  //    "domainId": 2
  //  }
  //];


  //accountTypes.forEach(function(accountType) {
  //  var users = accountType.users;
  //  AccountType.findOrCreate(
  //    {where: {type: accountType.type}}, //find params
  //    accountType, //create object
  //    function(err, instance) {
  //      if (!err) {
  //        users.forEach(function(user) {
  //          User.findOrCreate(
  //            {where: {id: user.id}}, //find
  //            user, //create
  //            createUserCb(user));
  //        });
  //      }
  //    }
  //  )
  //});

  //function createUserCb(user) {
  //  return function(err, instance) {
  //    if (!err) {
  //      users[instance.id - 1].domains.forEach(function(domain) {
  //        //set the fk for the user inside the domain
  //        domain.authUserId = user.id;
  //        Domain.findOrCreate(
  //          {where: {id: domain.id}}, //find
  //          domain, //create
  //          createDomainCb);
  //      });
  //    }
  //  }
  //}

  //function createDomainCb(err, domain) {
  //  if (err) throw err;
    //surveys.forEach(function (survey) {
    //  //set the fk domain in the survey
    //  survey.domainId = domain.id;
    //  Survey.findOrCreate(
    //    {where: {id: survey.id}}, //find
    //    survey, //create
    //    surveyCreateCb
    //  )
    //  ;
    //});
  //}

  //function surveyCreateCb(err, survey) {
  //  if (err) console.log(err);
  //  TrackerData.create({
  //    "authUserId": 1,
  //    "domainId": 1,
  //    "surveyId": 2
  //  }, function(err, instance) {
  //
  //  });
  //}

};
