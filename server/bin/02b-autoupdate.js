"use strict";

/**
 * Created by Allen on 12/30/2015.
 */
var server = require('../server');
//path: server/datasources.json
var ds = server.dataSources.postgresql;
var dsResponses = server.dataSources.responses;
var models = ['AccountType', 'AuthUser', 'Domain', 'Survey', 'TrackerData'];
var models2 = ['SurveyResponse'];

console.log('Updating models...');
ds.autoupdate(models, function(err, result) {

  if (err) throw (err);

  console.log(result);
  console.log('Success with postgresql...');

  ds.disconnect();
});

console.log('Updating mysql...');
dsResponses.autoupdate(models2, function(err, result2) {
  if (err) throw (err);

  console.log(result2);
  console.log('Success with mysql...');

  dsResponses.disconnect();
});
