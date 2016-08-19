"use strict";

module.exports = function(EmailTemplate) {

  /**
    Model for using just a HTML template for emails.
    @param {toWhom} The recipient of the email to be sent to.
    @param {htmlTemplate} Rendered Html template for body of email.
  */
  EmailTemplate.send = function(toWhom, htmlTemplate) {
    var fromWhom = 'Admin@alex.io';
    var subjectLine = 'No Subject.';

    EmailTemplate.app.models.email.send({
      to: toWhom,
      from: fromWhom,
      subject: subjectLine,
      html: htmlTemplate
    },function(err, mail) {
      if (err) return console.error(err);
      console.log('Message sent.');
    });

  };

};
