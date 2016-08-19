"use strict";
module.exports.createNewUserWithData = createNewUserWithData;

var app = require('../server');
var Email = app.models.Email;

function createNewUserWithData(req, res) {
  //console.log(req.params);
  console.log(req.body);
}
