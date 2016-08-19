"use strict";

var app = require('../../server/server');
var TrackerData = app.models.TrackerData;

module.exports = {};
module.exports.disableEndPoints = disableEndPoints;

function disableEndPoints(TrackerData) {
  TrackerData.disableRemoteMethod("upsert", true);
  TrackerData.disableRemoteMethod("updateAll", true);
  TrackerData.disableRemoteMethod("updateAttributes", false);


  TrackerData.disableRemoteMethod("deleteById", true);

  TrackerData.disableRemoteMethod("count", true);
  TrackerData.disableRemoteMethod("exists", true);

  TrackerData.disableRemoteMethod("createChangeStream", true);
}
