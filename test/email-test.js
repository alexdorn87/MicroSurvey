var loopback = require('loopback');
var MyEmail = require('../server/server').models.Email;
var assert = require('assert');
var nodemailer = require('nodemailer');

//Testing the email in loopback.
/*describe('Email and SMTP', function() {

  it('should have a send method', function() {
    assert(typeof MyEmail.send === 'function');
    assert(typeof MyEmail.prototype.send === 'function');
  });

  it('Testing from sendgrid titled.', function(done) {
      var message = new MyEmail({
        to: 'newlin.karl@gmail.com',
        from: 'ironsquishy@alex.io',
        subject: 'No-Reply',
        text: 'TEST TEST',
        html: '<h1>YOLO</h1>'
      });
      message.send(function(err, mail) {
        done(err);
      });
    });
});*/
