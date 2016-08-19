$(function() {
  var wWidth = $(window).width();

  // Homepage - Targeting images zoom modal
  if ($(".fancybox").length) {
    $(".fancybox").fancybox ({
      beforeShow : function() {
        var alt = this.element.find('img').attr('alt');
        this.inner.find('img').attr('alt', alt);
        this.title = alt;
      }
    });
  }

  // Topnav. Mobile toggle
  $('.topnav-toggle').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-active');
    $(this).toggleClass('active');
  });

  $(".nav-toggle-mobile").on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-active');
    $('.topnav-toggle').toggleClass('active');
  });

  // scrollTo anchor
  $('.scroll-to').on('click', function (e) {
    e.preventDefault();
    var anchor = $(this).attr('data-target');
    var topPos = $(anchor).offset().top;
    $('html, body').animate({
      scrollTop: topPos
    }, 800);
  });

  // scroll-top button
  $(".scroll-top").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  $(window).on("load scroll", function() {
    var pos = $(window).scrollTop();
    var $btn = $(".scroll-top");
    pos > 500 ? $btn.fadeIn(100) : $btn.fadeOut(100);
  });

  // Mobile Navigation Toggle
  $(window).on("load scroll", function() {
    var pos = $(window).scrollTop();
    var $nav = $(".topnav-wrap");
    pos > 100 ? $nav.addClass("scrolled") : $nav.removeClass("scrolled");
  });

  // Copy to Clipboard
  var modalActive = false;
  $(".copy-to").on('click', function(e) {
    if (modalActive) return false;

    e.preventDefault();
    modalActive = true;
    var target = $(this).attr("data-target");
    var text = $(target).text() || $(target).val();
    copyToClipboard(text);
    $("#copy_note").fadeIn("500").delay("2000").fadeOut("500", function() {modalActive = false});
  });

  // How to list slider
  if ($('#how_to_list').length && wWidth < 767) {
    $('#how_to_list').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      auto: false,
      speed: 500,
      pager: false,
      controls: true,
      infiniteLoop: false,
      hideControlOnEnd: true
    });
  }
  if ($('#questions_list').length && wWidth < 767) {
    $('#questions_list').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      auto: false,
      speed: 500,
      pager: true,
      controls: true
    });
  }

  if ($('#question_slider').length && wWidth < 980) {
    $('#question_slider').bxSlider({
      minSlides: 1,
      maxSlides: 1,
      auto: false,
      speed: 500,
      pager: true,
      nextSelector: '#question_next',
      prevSelector: '#question_prev'
    });
  }

  // Website Field - Setup Wizard
  $("#website_input").on("blur", function() {

  });

  // Collapse Menu
  $(document).on("click", '.learn-more', function (e) {
    e.preventDefault();
    var wWidth = $(window).width();
    var $container = $(this).closest(".collapse-box");
    var target = $(this).attr("data-collapse-target");
    var $target = $container.find(target);
    var innerHeight = $target.find(".inner-panel").outerHeight();
    var boxHeight = $target.attr("data-height");
    var boxMobileHeight = $target.attr("data-mobile-height");
    var boxInitHeight = wWidth < 768 ? parseInt(boxMobileHeight) || 0 : parseInt(boxHeight) || 176;

    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $target.height(innerHeight).addClass('open');
    } else {
      $(this).removeClass('active');
      $target.height( boxInitHeight).removeClass('open');
    }
  });

  // Modal Popups
  $('html').click(function(e) {
    var el = e.target;
    var isModalBox = $(el).hasClass('popup-box');
    var isModalChild = $(el).closest('.popup-box').length;
    var isModal = isModalBox + isModalChild;
    var isToggle = $(el).attr('data-toggle') == "modal";
    var isToggleChild = $(el).closest("[data-toggle]").length;
    var isModalToggle = isToggle + isToggleChild;

    if (!(isModal || isModalToggle)) {
      $(".popup-wrapper.in").removeClass("in").delay(300).queue(function(next){
        $("body").removeClass("modal-open");
        next();
      });
    }
  });

  $("[data-toggle='modal']").on("click", function(e) {
    e.preventDefault();
    var target = $(this).attr("data-target");
    $("body").addClass("modal-open");
    $(target).addClass("in");
  });

  $(".close-popup").on("click", function(e) {
    e.preventDefault();
    var modal = $(this).closest(".popup-wrapper");
    $(modal).removeClass("in").delay(300).queue(function(next){
      $("body").removeClass("modal-open");
      next();
    });
  });
});

function copyToClipboard(copyVal) {
  var aux = document.createElement("input");
  aux.setAttribute("value", copyVal);
  document.body.appendChild(aux);

  aux.select();

  document.execCommand("copy");
  document.body.removeChild(aux);
}
