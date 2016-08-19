"use strict";
module.exports.index = index;

function index(req, res) {
  res.render('choose_q2', {
    referralId: req.query.ref
  });
}
