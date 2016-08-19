"use strict";

var config = require('../datasources-config');

module.exports = {
  "postgresql": {
    "host": config.host,
    "port": config.postgresPort,
    "database": "alexiodb",
    "username": "postgres",
    "password": process.env.PG_STAGING_PASS || '',
    "name": "postgresql",
    "connector": "postgresql",
    "user": "postgres"
  },
  "responses": {
    "host": config.host,
    "port": config.mysqlPort,
    "database": "alexioresponses",
    "username": "alexioMYSQL",
    "password": process.env.MYSQL_STAGING_PASS || '',
    "name": "responses",
    "connector": "mysql",
    "user": "alexioMYSQL",
    "debug": true
  }
};
