"use strict";
module.exports.index = index;

function index(req, res) {
  res.render('terms', {
    referralId: req.query.ref
  });
}
