$(function() {
  var urlRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

  // Setup Wizard. Question check
  $(document).on("click", ".question", function() {
    var $el = $(this);
    $(".question").removeClass("active");
    $el.find(".question-radio").prop("checked", true);
    $el.addClass("active");
  });

  /*== Setup Wizrd - Account - Job role select ==*/
  $(".styled-select").on("change", function() {
    var $el = $(this);
    var target = $el.attr("data-target");
    var value = $el.find("option:selected").text();
    $(target).val(value);
  });

  /*== Wizard - step1 ==*/
  $('#question_submit').on('click', function () {
    //$.ajax('edit_q3', {
    //  type: 'POST',
    //  data: $.param($('#website_input').val())
    //});
    window.location.href = 'edit_q3?siteUrl=' + $('#website_input').val();
  });


  /*== Wizard - step2 ==*/
  $('#setup_account_login').on('click', function () {
    window.location.href = 'account_q4?questionText=' + $('.question-area').val();
  });

  /*== Wizard - step3 ==*/
  $('.account-form').on('submit', function (e) {
    e.preventDefault();
    console.log($.param($('form')));
    $.ajax('/api/AuthUsers/createUserWithDomain', {
      type: 'POST',
      data: {
        email: $('#email').val(),
        username: $('#email').val(),
        password: $('#setup_acc_password').val(),
        domainUrl: $('#domainUrl').val(),
        domainName: $('#domainUrl').val()
      },
      success: function (response) {
        console.log(response);
        if(response.data.created){
          window.location.href = 'dashboard';
        }
      },
      statusCode: {
        //unprocessable entity, some kind of validation error on object creations
        422: function(response) {
          console.log(response );
        }
      }
    })
  });


  /*== Setup Wizard - Account Password Validation ==*/
  $("#setup_acc_password").on("focus", function() {
    $("#pass_tooltip").fadeIn(200);
  }).on("keyup change", function() {
      var val = $(this).val();
      var isLength = val.length >= 6;
      var isMix = /^(?=.*[a-zA-Z])(?=.*[0-9])/gi.test(val);
      var isChar = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(val);
      $("#pass_length").toggleClass("pass",isLength);
      $("#pass_mix").toggleClass("pass", isMix);
      $("#pass_char").toggleClass("pass", isChar);

    }).on("blur", function() {
      $("#pass_tooltip").fadeOut(200);
    });

  /*== Setup Wizard. Get Screenshot ==*/
   $("#website_input").on("blur", function() {
     var $wrapper = $(".website-field-box");
     var siteUrl = $(this).val();
     var $this = $(this);
     var isUrl = siteUrl.match(urlRegExp);

     if (!isUrl) {
       $wrapper.addClass('error');
       return false;
     }
     $wrapper.removeClass('error');
     $this.prop("disabled", true);
     $("#loadbar").addClass("active").removeClass("loaded");
     $("#q2").removeClass("active");
     $("#question_submit").prop("disabled", true);

     $.ajax({
       method: "POST",
       url: "/api/screenshot",
       data: { url: siteUrl }
     })
     .done(function( response ) {
       $this.prop("disabled", false);
       $("#q2").addClass("active");
       $("#loadbar").addClass("loaded").removeClass("active");
       $("#question_submit").prop("disabled", false);
       $("#setup_wrapper").addClass("site-loaded")
         .css('background-image', 'url(' + response.url + ')');
     });
   }).on("keypress", function(e) {
       if(e.keyCode == 13) {
         $(this).trigger("blur");
       }
   });
});
