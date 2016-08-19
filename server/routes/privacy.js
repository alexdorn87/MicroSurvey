"use strict";
module.exports.index = index;

function index(req, res) {
  res.render('privacy', {
    referralId: req.query.ref
  });
}
