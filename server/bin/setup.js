"use strict";

var createTables = require('./00-create-lb-tables');
var automigrate = require('./01-automigrate');

[createTables, automigrate].forEach(function(task) {
  task();
});
