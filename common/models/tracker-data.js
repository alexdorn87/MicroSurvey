"use strict";

var disableEndPoints = require('../modelsLogic/trackerData').disableEndPoints;

module.exports = function(TrackerData) {
  disableEndPoints(TrackerData);
};
