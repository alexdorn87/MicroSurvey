"use strict";
module.exports.index = index;

function index(req, res) {
  if (req.query.questionText) {
    req.session.questionText = req.query.questionText;
  }

  console.log(req.session);
  res.render('account_q4', {
    referralId: req.query.ref
  });
}
