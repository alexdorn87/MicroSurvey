"use strict";

var config = require('../datasources-config');

module.exports = {
  "postgresql": {
    "host": config.host,
    "port": config.postgresPort,
    "database": "alexiodb",
    "username": "postgres",
    "password": process.env.PG_PROD_PASS || '',
    "name": "postgresql",
    "connector": "postgresql",
    "user": "postgres"
  },
  "responses": {
    "host": config.host || 'localhost',
    "port": config.mysqlPort || 3306,
    "database": "alexioresponses",
    "username": "alexioMYSQL",
    "password": process.env.MYSQL_PROD_PASS || '',
    "name": "responses",
    "connector": "mysql",
    "user": "alexioMYSQL"
  }
};
