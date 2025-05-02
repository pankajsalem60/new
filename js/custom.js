
// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.1);
    $('#gallery').parallax("100%", 0.3);
    $('#menu').parallax("100%", 0.2);
    $('#team').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);
  }
  initParallax();

  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

  // NIVO LIGHTBOX
  $('#gallery a').nivoLightbox({
        effect: 'fadeScale',
    });

  // Add login button to navigation if it doesn't exist
  if ($('#loginButton').length === 0) {
    const loginButton = $('<li><a href="#" id="loginButton">Login</a></li>');
    const userDisplay = $('<span id="userDisplay"></span>');
    
    // Add login button to navbar
    $('.navbar-nav').append(loginButton);
    $('#loginButton').after(userDisplay);
    
    // Add click event
    $('#loginButton').on('click', function(e) {
      e.preventDefault();
      if (typeof showAuthModal === 'function') {
        showAuthModal();
      } else {
        console.error('Authentication module not loaded');
      }
    });
  }

});
