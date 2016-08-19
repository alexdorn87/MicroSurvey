"use strict";

var server = require('../server');
//path: server/datasources.json
var ds = server.dataSources.postgresql;
var dsResponses = server.dataSources.responses;

/* this will drop and create all tables again */
ds.automigrate(function(err) {
  if (err) throw err;
  ds.disconnect();

  /* this will create tables in the responses table datasource */
  dsResponses.automigrate(function(err) {
    if (err) throw err;
    dsResponses.disconnect();
  });
});
