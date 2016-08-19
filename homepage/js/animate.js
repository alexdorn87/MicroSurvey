$(function() {
  var isAnimation = $("html").hasClass("cssanimations");
  var progressUpdated = false;

  $(window).on("load scroll resize", function() {
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    var wScroll = $(window).scrollTop();
    var isPageBottom = $(document).height() - ($(window).scrollTop() + $(window).height()) < 100;
    var ratio = isPageBottom ? 0 : parseInt((wHeight / 100) * 75);
    var $progressBar = $("#friend_progress");
    if ($progressBar.length) {
      var friends = $progressBar.attr("data-friends");
      var progressRatio = (100 / 20) * parseInt(friends);
      var progressPos = $progressBar.offset().top;
    }

    if (isAnimation && wWidth > 767) {
      $(".animated-box").each(function() {
        var $el = $(this);
        var elPos = $el.offset().top;
        var animation = $el.attr("data-enter");
          if (elPos < wScroll + ratio || isPageBottom) {
            $el.addClass('animated '+ animation);
          }
      });
    }

    if ($progressBar.length) {
      if (progressPos < wScroll + ratio && !progressUpdated) {
        if (wWidth < 768) {
          $progressBar.height(progressRatio + "%");
        } else {
          $progressBar.width(progressRatio  + "%");
        }
        progressUpdated = true;
      }
    }
  });
});

