"use strict";

module.exports = function(Email) {

  /**
  * Sending emails.
  */
  Email.send = function() {
    throw new Error('You must connect the Email Model to a Mail connector');
  };

/**
 * A shortcut for Email.send(this).
 */
  Email.prototype.send = function() {
    throw new Error('You must connect the Email Model to a Mail connector');
  };

};
