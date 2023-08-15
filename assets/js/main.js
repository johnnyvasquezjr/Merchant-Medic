/*
Theme Name: Yose
Description: Responsive Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/yose/
Author URI: https://themeforest.net/user/erilisdesign
Version: 3.0.0
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------
[Table of contents]

1. Loader
2. Website layout
3. Navigation
4. Back to top
5. Backgrounds
6. Granim
7. Lightbox
8. Countdown
9. Subscribe Form
10. Contact Form
11. Bootstrap
12. Typed text
13. Slider
14. AOS
------------------------------------------------------*/

(function($){
  "use strict";

  // Vars
  var $html = $('html'),
    $body = $('body'),
    $siteMenuToggler = $('.menu-toggler'),
    $siteMenu = $('.site-menu'),
    $siteMenuBody = $('.site-menu-body'),
    $btn_backToTop = $('.btn-back-to-top');

  function getWindowWidth(){
    return Math.max($(window).width(), window.innerWidth);
  }

  function getWindowHeight(){
    return Math.max($(window).height(), window.innerHeight);
  }

  function getDocumentWidth(){
    return Math.max($(document).width(), document.body.clientWidth);
  }

  function getScrollbarWidth(){
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  // [1. Loader]
  window.addEventListener( 'load', function(){
    document.querySelector('body').classList.add('loaded');
  });

  // [2. Website layout]
  function website_layout(){
    var currentPos = $(window).scrollTop();

    if ( currentPos > 0 ){
      yose_navChangeClasses('resize');
    } else {
      yose_navChangeClasses();
    }
  }

  // [3. Navigation]
  function yose_navigation(){

    // Clickable Links
    $(document).on( 'click', 'a.scrollto, .site-menu a[href^="#"]', function(e){
      var target;

      // Make sure this.hash has a value before overriding default behavior
      if ( this.hash !== '' && this.hash !== '#!' && $( this.hash ).length > 0 ){
        target = this.hash;
      } else {
        return false;
      }

      if ( target !== '' ){
        // Prevent default anchor click behavior
        e.preventDefault();

        var targetPosition = parseInt( Math.max( document.querySelector(target).offsetTop, $(target).offset().top ), 10 );

        smoothScroll(targetPosition);
        $(this).blur();
      }

      return false;
    });

    // Back to top
    $(document).on( 'click', '.btn-back-to-top', function(e){
      e.preventDefault();

      smoothScroll(0);

      $(this).blur();
    });

    // Menu toggler
    $(document).on( 'click', '.menu-toggler', function(e){
      e.preventDefault();

      if ( !$siteMenuToggler.hasClass('open') ){
        $siteMenuToggler.addClass('open');
        $siteMenuBody.addClass('show');
      } else {
        $siteMenuToggler.removeClass('open');
        $siteMenuBody.removeClass('show');
      }

      $(this).blur();
    });

    // Close menu on click outside of '.site-menu'
    $(document).on( 'click touchstart', function(e){
      if ( $siteMenuBody.is(e.target) || $(e.target).closest('.site-menu').hasClass('site-menu') || $(e.target).hasClass('menu-toggler') ){
        return;
      }

      if ( $siteMenuToggler.hasClass('open') ){
        $siteMenuToggler.removeClass('open');
        $siteMenuBody.removeClass('show');
      }
    });

  }

  function yose_navOnScroll(){
    var currentPos = $(window).scrollTop();

    if ( currentPos > 0 ){
      if ( $body.hasClass('scrolled') ){
        return;
      }

      $body.addClass('scrolled').removeClass('scrolled-0');
      yose_navChangeClasses('scrolled');
    } else {
      $body.removeClass('scrolled').addClass('scrolled-0');
      yose_navChangeClasses();
    }
  }

  var nav_event_old;
  function yose_navChangeClasses(nav_event){
    if ( nav_event_old === nav_event && !( nav_event == '' || nav_event == undefined || nav_event == 'resize' ) )
      return;

    var currentPos = $(window).scrollTop();

    if ( nav_event === 'scrolled' || ( nav_event === 'resize' && currentPos > 0 ) ){
      $('[data-menu-scrolled]').each(function(){
        $(this).removeClass( $(this).attr('data-menu-base') );
        $(this).addClass( $(this).attr('data-menu-scrolled') );
    });
    } else {
      $('[data-menu-scrolled]').each(function(){
        $(this).removeClass( $(this).attr('data-menu-scrolled') );
    });
      $('[data-menu-base]').each(function(){
        $(this).addClass( $(this).attr('data-menu-base') );
    });
    }

    nav_event_old = nav_event;
  }

  function smoothScroll(targetPosition){
    $(window).scrollTo(targetPosition,800);
  }

  // [4. Back to top]
  function yose_backToTop(){
    if ( $btn_backToTop.length > 0 ){
      var currentPos = $(window).scrollTop();

      if ( currentPos > 400 ){
        $btn_backToTop.addClass('show');
      } else {
        $btn_backToTop.removeClass('show');
      }
    }
  }

  // [5. Backgrounds]
  function yose_backgrounds(){

    // Image
    var $bgImage = $('.bg-image-holder');
    if ($bgImage.length){
      $bgImage.each(function(){
        var $self = $(this);
        var src = $self.children('img').attr('src');

        $self.css('background-image','url('+src+')').children('img').hide();
      });
    }

    // Video Background
    if ( $body.hasClass('mobile') ){
      $('.video-wrapper').css('display','none');
    }

  }

  // [6. Granim]
  function yose_granim(){
    if ( $('[data-gradient-bg]').length > 0 ){
      if (typeof Granim == 'undefined' && typeof Granim !== 'function'){
        console.log('Granim: Granim not defined.');
        return true;
      }

      $('[data-gradient-bg]').each(function(index,element){
        var granimParent = $(this),
          granimID = 'granim-'+index+'',
          colours = granimParent.attr('data-gradient-bg'),
          colours = colours.replace(' ',''),
          colours = colours.replace(/'/g, '"')
          colours = JSON.parse( colours );

        // Add canvas
        granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

        var granimInstance = new Granim({
          element: '#'+granimID,
          name: 'basic-gradient',
          direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
          opacity: [1, 1],
          isPausedWhenNotInView: true,
          states : {
            "default-state": {
              gradients: colours
            }
          }
        });
      });
    }
  }

  // [7. Lightbox]
  function yose_lightbox(){
    if (!$().featherlight){
      console.log('Featherlight: featherlight not defined.');
      return true;
    }

    $.extend($.featherlight.defaults, {
      closeIcon: '<i class="fas fa-times"></i>'
    });

    $.extend($.featherlightGallery.defaults, {
      previousIcon: '<i class="fas fa-chevron-left"></i>',
      nextIcon: '<i class="fas fa-chevron-right"></i>'
    });

    $.featherlight.prototype.afterOpen = function(){
      $body.addClass('featherlight-open');
    };

    $.featherlight.prototype.afterContent = function(){
      var title = this.$currentTarget.attr('data-title');
      var text = this.$currentTarget.attr('data-text');

      if ( !title && !text )
        return;

      this.$instance.find('.caption').remove();

      var title = title ? '<h4 class="title-gallery">' + title + '</h4>' : '',
        text = text ? '<p class="text-gallery">' + text + '</p>' : '';

      $('<div class="caption">').html( title + text ).appendTo(this.$instance.find('.featherlight-content'));
    };

    $.featherlight.prototype.afterClose = function(){
      $body.removeClass('featherlight-open');
    };
  }

  // [8. Countdown]
  function yose_countdown(){
    var countdown = $('.countdown[data-countdown]');

    if (countdown.length > 0){
      countdown.each(function(){
        var $countdown = $(this),
          finalDate = $countdown.data('countdown');
        $countdown.countdown(finalDate, function(event){
          $countdown.html(event.strftime(
            '<div class="countdown-container row"><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%-D</div><span class="title">Day%!d</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%H</div><span class="title">Hours</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%M</div><span class="title">Minutes</span></div></div><div class="col-6 col-sm-auto"><div class="countdown-item"><div class="number">%S</div><span class="title">Seconds</span></div></div></div>'
          ));
        });
      });
    }
  }

  // [9. Subscribe Form]
  function yose_subscribeForm(){
    var $subscribeForm = $('.subscribe-form');

    if ( $subscribeForm.length > 0 ){
      $subscribeForm.each( function(){
        var el = $(this),
          elResult = el.find('.subscribe-form-result');

        el.find('form').validate({
          submitHandler: function(form) {
            elResult.fadeOut( 500 );

            $(form).ajaxSubmit({
              target: elResult,
              dataType: 'json',
              resetForm: true,
              success: function( data ) {
                elResult.html( data.message ).fadeIn( 500 );
                if ( data.alert != 'error' ) {
                  $(form).clearForm();
                  setTimeout(function(){
                    elResult.fadeOut( 500 );
                  }, 5000);
                };
              }
            });
          }
        });

      });
    }
  }

  // [10. Contact Form]
  function yose_contactForm(){
    var $contactForm = $('.contact-form');

    if ( $contactForm.length > 0 ){
      $contactForm.each( function(){
        var el = $(this),
          elResult = el.find('.contact-form-result');

        el.find('form').validate({
          showErrors: function(errorMap, errorList) {
            this.defaultShowErrors();

            website_layout();
          },
          submitHandler: function(form) {
            elResult.fadeOut( 500 );

            $(form).ajaxSubmit({
              target: elResult,
              dataType: 'json',
              success: function( data ) {
                elResult.html( data.message ).fadeIn( 500 );
                website_layout();
                if ( data.alert != 'error' ) {
                  $(form).clearForm();
                  setTimeout(function(){
                    elResult.fadeOut( 500 );
                    website_layout();
                  }, 5000);
                };
              }
            });
          }
        });

      });
    }
  }

  // [11. Bootstrap]
  function yose_bootstrap(){

    // Botostrap Tootltips
    $('[data-toggle="tooltip"]').tooltip();

    // Bootstrap Popovers
    $('[data-toggle="popover"]').popover();

    // Modals
    $('.modal').on({
      'show.bs.modal': function(){
        document.documentElement.style.overflow = 'hidden';
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
        $siteMenu.css( 'right', getScrollbarWidth() );
        $btn_backToTop.css( 'right', getScrollbarWidth() );
      },
      'hidden.bs.modal': function(){
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
        $siteMenu.css( 'right', '' );
        $btn_backToTop.css( 'right', '' );
      }
    });

  }

  // [12. Typed text]
  function yose_typedText(){
    var toggle = document.querySelectorAll('[data-toggle="typed"]');

    function init(el) {
      var elementOptions = el.dataset.options;
          elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
      var defaultOptions = {
        typeSpeed: 40,
        backSpeed: 40,
        backDelay: 3000,
        loop: true
      }
      var options = Object.assign(defaultOptions, elementOptions);

      new Typed(el, options);
    }

    if (typeof Typed !== 'undefined' && toggle) {
      [].forEach.call(toggle, function(el) {
        init(el);
      });
    }

  }

  // [13. Slider]
  function yose_slider() {
    var $slider = $('.slider');

    if ($slider.length > 0){

      if ( !$slider.hasClass('slick-initialized') ){
        $slider.slick({
          slidesToShow: 1,
          infinite: true,
          nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
          prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>'
        });
      }

      if ( 1199 >= getWindowWidth() && $slider.hasClass('slick-initialized') && $slider.hasClass('slick-destroy-xl') ){
        $slider.slick('unslick');
      }

      if ( 991 >= getWindowWidth() && $slider.hasClass('slick-initialized') && $slider.hasClass('slick-destroy-lg') ){
        $slider.slick('unslick');
      }

      if ( 767 >= getWindowWidth() && $slider.hasClass('slick-initialized') && $slider.hasClass('slick-destroy-md') ){
        $slider.slick('unslick');
      }

      if ( 575 >= getWindowWidth() && $slider.hasClass('slick-initialized') && $slider.hasClass('slick-destroy-sm') ){
        $slider.slick('unslick');
      }

    }
  }

  // [14. AOS]
  function yose_aos(){
    if( $('[data-aos]').length > 0 ){
      AOS.init({
        once: true
      });
    }
  }

  $(document).ready(function($){
    website_layout();

    yose_navigation();
    yose_navOnScroll();
    yose_backToTop();
    yose_backgrounds();
    yose_granim();
    yose_lightbox();
    yose_countdown();
    yose_subscribeForm();
    yose_contactForm();
    yose_bootstrap();
    yose_typedText();
    yose_slider();
    yose_aos();
  });

  $(window).on( 'scroll', function(){
    yose_navOnScroll();
    yose_backToTop();
  });

  var clear_website_layout;

  window.addEventListener( 'load', function(){
    website_layout();
  });

  $(window).on('resize', function(){
    yose_navOnScroll();
    yose_backToTop();
    yose_slider();

    clear_website_layout = setTimeout( website_layout(), 20 );
  });

})(jQuery);