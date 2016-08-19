"use strict";
var $ = jQuery;
var fb_appId = '1713728528864878';
//window.linkedin_apiKey = '786xb2sq31g574';

window.init = function (){
  IN.Event.on(IN, "auth", shareContent);
}

window.onSuccess = function (data){
  console.log('Linkedin Data sent successful.');
}
window.onError = function(err){
  console.log('Linkedin error.');
}
window.shareContent = function (){
  // Build the JSON payload containing the content to be shared
    var payload = {
      "comment": "Checkout alex.io!!! at http://alex.io",
      "visibility": {
        "code": "anyone"
      }
    };

    IN.API.Raw("/people/~/shares?format=json")
      .method("POST")
      .body(JSON.stringify(payload))
      .result(onSuccess)
      .error(onError);
}


window.fbAsyncInit = function () {
  FB.init({
    appId: fb_appId,
    xfbml: true,
    version: 'v2.5'
  });
  FB.Event.subscribe('edge.create', function (url, html) {
    // like clicked
    completeTask('facebook');
  });
};

// Wait for the asynchronous resources to load
window.twttr.ready(function (twttr) {
  // Now bind our custom intent events
  twttr.events.bind('follow', followIntentToAnalytics);
});
function completeTask(taskName) {
  var url = ['referrals/', window.referralId, '/tasks/', taskName, '/complete'].join('');
  $.ajax({
    url: url,
    type: 'post',
    data: {type: 'like', uid: 'login session user id'},
    success: function (data){
      // On successful Response.
      console.log('task sent: success');
      //window.location.reload();
      hideTaskElement(taskName);
      changeTaskChecked(taskName);
    }, error: function () {
      // On Error.
      console.error('task sent: error');
    }
  });
};

function followIntentToAnalytics(intentEvent) {
  completeTask('twitter');
};

function hideTaskElement(task){
  $('#task-'+task).hide();
}

function changeTaskChecked(task){
  if(task == 'angellist'){
    var el = '#i-' + task;
    var textElement = '#txt-'+task;
    var txtValue = 'Awesome job Angel.co task complete';
    $(el).removeClass('icon-plus').addClass('icon-check green');
    $(textElement).contents()[0].nodeValue = txtValue;
  }else{
    var el = '#i-' + task;
    var textElement = '#txt-'+task;
    task = task.charAt(0).toUpperCase() + task.slice(1).toLowerCase();
    var txtValue = 'Awesome job '+ task + ' task complete';
    $(el).removeClass('icon-plus').addClass('icon-check green');
    $(textElement).contents()[0].nodeValue = txtValue;
  }
}

(function ($, w){
  $(document).ready(function(){

    $('#linkedin-share').click(function(){
      w.open("https://www.linkedin.com/shareArticle?mini=true&url=http://alex.io/r/"+ w.referralId + "&title=alex.io%20-%20Micro%20Surveys%20for%20User%20Insights%20and%20Feedback", "_blank", "width=1000, height=600");
      return false;
    });
    $('.icon-twitter').click(function () {
      w.open( "https://twitter.com/intent/tweet?url=https://alex.io/r/" + w.referralId, "_blank", "width=1000, height=600");
      return false;
    });
    $('.icon-facebook').click(function () {
      w.open( "https://www.facebook.com/sharer/sharer.php?u=http://alex.io/r/" + w.referralId, "_blank", "width=1000, height=600");
      return false;
    });

    $('#angelco-follow-button').on("click", function(){
      w.open("https://angel.co/follow/Startup/6uLW", "_blank", "width=1000, height=600");
      completeTask('angellist');
      return false;
    });

    $('#task-linkedin').on("click", function(){
      w.open("http://linkedin.com/company/alexio", "_blank", "width=1000, height=600");
      completeTask('linkedin');
      return false;
    });
  });
})(jQuery, window);
