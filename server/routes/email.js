"use strict";
module.exports.sendEmail = sendEmail;

var app = require('../server');
var Email = app.models.Email;

function sendEmail(req, res) {
  var sendTo = req.body.sendTo.split(',');
  var replyTo = req.body.replyTo;
  var htmlMessage = req.body.message || "<h1>YOLO</h1>";
  var subject = req.body.subject || 'alex.io tag and instructions';
  var comments = req.body.comments && req.body.comments.trim() || "";
  if (comments.length > 0) {
    htmlMessage += comments;
  }
  var email = new Email({
    to: sendTo,
    from: replyTo,
    subject: subject,
    text: 'Test email .....',
    html: htmlMessage
  });

  email.send(function(err, mail) {
    if (err) return res.send(err);

    return res.json({
      mail: mail,
      sent: true
    });
  });
}
