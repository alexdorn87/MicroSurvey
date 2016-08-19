"use strict";
module.exports.index = index;

function index(req, res) {
  console.log(req.query);
  if (req.query.siteUrl) {
    req.session.siteUrl = req.query.siteUrl;
  }

  console.log(req.session);
  res.render('edit_q3', {
    referralId: req.query.ref
  });
}
