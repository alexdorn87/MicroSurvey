"use strict";

var server = require('../server');
//path: server/datasources.json
var ds = server.dataSources.postgresql;
var dsResponses = server.dataSources.responses;
var models = ['AccountType', 'AuthUser', 'Domain', 'Survey', 'TrackerData'];
var models2 = ['SurveyResponse'];

/*Checks if database state changed if so make appropriate updates on database.*/
ds.isActual(models, function(err, actual) {
  console.log('Updating tables...');

  if (!actual) {
    console.log('Updates on postgresql.');
    ds.autoupdate(models, function(err, result) {
      ds.disconnect();
      dsResponses.isActual(models2, function(err, actual2) {
        if (!actual2) {
          console.log('Updates on mysql.');
          dsResponses.autoupdate(models2, function(err, result2) {
            console.log(result2);
            dsResponses.disconnect();
          });
        }
      });
    });
  }
});
