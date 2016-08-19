'use strict';

var GLOBAL_CONFIG = require('../global-config');

module.exports = {
  hostname: GLOBAL_CONFIG.hostname,
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  port: 3000,
  legacyExplorer: GLOBAL_CONFIG.legacyExplorer
};
