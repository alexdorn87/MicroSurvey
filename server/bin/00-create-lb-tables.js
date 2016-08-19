"use strict";

var server = require('../server');
var datasource = server.dataSources.postgresql;
var datasourceResponses = server.dataSources.responses;
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];

datasource.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in', datasource.adapter.name);
  datasource.disconnect();
});
