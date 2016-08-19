"use strict";
module.exports.index = index;

function index(req, res) {
  res.render('install_q5', {
    referralId: req.query.ref
  });
}
