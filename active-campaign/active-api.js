'use strict';

var ActiveCampaign = require('activecampaign');
var _ = require('lodash');
var AC_APIKEY = 'b0abc27215aea07a51120ae34ef29e51d9b88b1009a47ef9d5a4af54774cb5582c697621';
var ACT_ID = '223263823';
var AC_TRACK_KEY = 'd009d89a86451ad8fa1d07911c4adc4dc493dd72';
var AC_ROOT_URL = 'https://alexio.api-us1.com';

var urlTags = { newEvent: 'tracking/log',
               eventList: 'tracking/event/list',
               addContact: 'contact/add',
               autoList: 'automation/list',
               listList: 'list/list?ids=all' };

var ActiveCamp = function () {};

ActiveCamp.prototype.eventTrack = function (activecampaign, visit, ACevent, eventValue) {
  var trackEvent = activecampaign.api(urlTags.newEvent, {
    event: ACevent,
    eventdata: eventValue,
    visit: visit
  });
  trackEvent.then(function (res) {
    console.log((res.success == 1) ? 'Event Sent.' : 'Error event.');
  }).catch(function (err) {
    console.log(err);
  });
};

ActiveCamp.prototype.addContactAC = function (email, referralId) {
  var self = this;
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;

  var addContact = ac.api(urlTags.addContact, {
    email: email,
    'p[7]': '7',
    'status[1]': '1'
  });
  addContact.then(function (res) {
    console.log((res.success) ? 'Add Contact' : res);
    self.eventTrack(ac, { email: email }, 'alexio_signup', 'alex.io/r/' + referralId);
  }).catch(function (err) {
    console.log('Server Error..');
    console.error(err);
  });
};

ActiveCamp.prototype.completeTaskEvent= function (ACemail) {
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;
  var tmpVisit = { email: ACemail };
  this.eventTrack(ac, tmpVisit, 'complete_task', 'complete task');
};

ActiveCamp.prototype.referralEmail = function (ACemail, Refemail) {
  var tmpVisit = { email: ACemail, referrer: Refemail };
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;
  this.eventTrack(ac, tmpVisit, 'referrer_signup', 'Referred a user');
};

ActiveCamp.prototype.activePointsAdded = function (ACemail, ACpoints) {
  var tmpVisit = { email: ACemail };
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;
  this.eventTrack(ac, tmpVisit, 'contact_points', (ACpoints | 0));
};

ActiveCamp.prototype.loggedInto = function (ACemail) {
  var tmpVisit = { email: ACemail };
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;
  this.eventTrack(ac, tmpVisit, 'logged_event', 'logged into referral');
};

ActiveCamp.prototype.completeTaskCustom = function (ACemail, tasks, totalPoints) {
  var ac = new ActiveCampaign(AC_ROOT_URL, AC_APIKEY);
  ac.track_actid = ACT_ID;
  ac.track_key = AC_TRACK_KEY;
  var tmpVisit = { email: ACemail };

  var taskCount = 0;
  _.forEach(tasks, function (val, key) {
      if (val) {
        taskCount += 1;
      }
    });

  if (taskCount % 3 == 0) {
    //TODO explicit adding 1 to the totalPoint.
    totalPoints = (taskCount/3) + (totalPoints | 0);

    console.log('Completed all tasks');
    this.eventTrack(ac, tmpVisit, 'contact_points', totalPoints);
  } else {
    console.log('Need to more tasks');
  }
};

ActiveCamp.prototype.sendPosition = function (email, position, state){
  //TODO finish position.
};

module.exports = new ActiveCamp();
