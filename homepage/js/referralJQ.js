'use strict';
//var clientId = '1097584099378-8mdboorfhma5pn0jmtnnq63hk5hilkhn.apps.googleusercontent.com';
//var apiKey = 'L1mn2I3n81xIs-8eZQGN2CTa';
//var scopes = 'https://www.googleapis.com/auth/contacts.readonly';
//var APP = window.APP = window.APP || {};
//APP.global = null;
//$(document).ready(APP.global.init);

(function ($, w) {
  $(document).ready(function () {
    try {

      if(w.totalReferred <= 5 && w.totalReferred > 0){
        $('#first-reward').removeClass('reward-box locked animated-box').addClass('reward-box open active animated-box');
        $('#first-reward').attr('data-enter', "zoomInLight");
      }

      if(w.totalReferred > 5){
        $('#first-reward').removeClass('reward-box locked animated-box').addClass('reward-box open animated-box');
        $('#first-reward').attr('data-enter', "fadeIn");
        $('#second-reward').removeClass('reward-box locked animated-box').addClass('reward-box open active animated-box');
        $('#second-reward').attr('data-enter', "zoomInLight");
      }

      if(w.totalReferred >= 10){
        $('#second-reward').removeClass('reward-box open active animated-box').addClass('reward-box open animated-box');
        $('#second-reward').attr('data-enter', "fadeIn");
        $('#third-reward').removeClass('reward-box locked animated-box').addClass('reward-box open active animated-box');
        $('#third-reward').attr('data-enter', "zoomInLight");
      }

      if(w.totalReferred >= 15){
        $('#third-reward').removeClass('reward-box open active animated-box').addClass('reward-box open animated-box');
        $('#third-reward').attr('data-enter', "fadeIn");
        $('#fourth-reward').removeClass('reward-box locked animated-box').addClass('reward-box open active animated-box');
        $('#fourth-reward').attr('data-enter', "zoomInLight");
      }

      //Task completion column and rewards list.
      if(w.totalReferred < 3){
        $('#social-actions').show();
        $('#rewards-state-1').hide();
        $('#rewards-state-2').hide();
      }else if(w.totalReferred > 4 || w.taskCount == 1){
        console.log('Showed soical sharing');
        $('#social-actions').hide();
        $('#rewards-state-1').hide();
        $('#rewards-state-2').show();
      } else {
        $('#social-actions').hide();
        $('#rewards-state-1').show();
        $('#rewards-state-2').hide();
      }

      if(w.allTaskComplete) $('.referral-tasks-wrap').hide();


      //Tokenize the input field
      /*$('#emails')
      //http://sliptree.github.io/bootstrap-tokenfield/
        .on('tokenfield:createtoken', function (e) {
          var data = e.attrs.value.split('|');
          e.attrs.value = data[1] || data[0];
          e.attrs.label = data[1] ? data[0] + ' (' + data[1] + ')' : data[0]
        })

        .on('tokenfield:createdtoken', function (e) {
          // Über-simplistic e-mail validation
          var re = /\S+@\S+\.\S+/;
          var valid = re.test(e.attrs.value);
          if (!valid) {
            $(e.relatedTarget).addClass('invalid')
          }
        })

        .on('tokenfield:edittoken', function (e) {
          if (e.attrs.label !== e.attrs.value) {
            var label = e.attrs.label.split(' (');
            e.attrs.value = label[0] + '|' + e.attrs.value
          }
        }).tokenfield();*/

      $(document).on("click", ".import-google", function (e) {
        e.preventDefault();
        gapi.client.setApiKey(apiKey);
        window.setTimeout(authorize(handleAuthorization), 0);
      });

      $('#invite-friends').on('click', function (e) {
        e.preventDefault();
        var url = "/api/sendEmail";
        var emails = $('#emails').tokenfield('getTokensList');
        var message = $('#message').val();
        $.ajax({
          url: url,
          type: 'post',
          data: {
            sendTo: emails,
            message: message,
            replyTo: "info@alex.io",
            subject: "alex.io Invitation"
          },
          success: function (r) {
            $('#email-modal').modal('hide');
          },
          fail: function () {
            $('#email-modal').modal('hide');
          }
        });
      });

    } catch (err) {
      console.log(err);
    }

  });
  function emailFilter(email) {
    return email.primary;
  }

  function authorize(handleAuthorization) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthorization);
  }

  function handleAuthorization(authorizationResult) {
    console.log(authorizationResult);
    if (authorizationResult && !authorizationResult.error) {
      $.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=50&v=3.0",
        function (response) {
          //process the response here
          console.log(response.feed.entry);
          var entries = response.feed.entry;
          var emails = entries.reduce(function (acc, contactEntry) {
            var foundContact = contactEntry.gd$email.filter(emailFilter);

            //exclude non email like addresses
            var re = /\S+@\S+\.\S+/;
            var valid = re.test(foundContact[0].address);
            if (valid) {
              acc.push(foundContact[0].address);
            }
            return acc;
          }, []);
          console.log(emails);
          $('#emails').tokenfield('setTokens', emails);
        });
    }
  }
})(jQuery, window);
