/*

  Styles the behaviour of arrow-icon and tweet form when user scrolls

*/

// Script is executed after document finishes loading
$(() => {

  // Hide icon intially until user scrolls
  $('#arrow-scroll').hide();

  // Stylizes icon behaviour when user scrolls
  $(window).on('scroll', function() {

    if ($(this).scrollTop() !== 0) { // If user is not at top of page
      $('#arrow-scroll').fadeIn('fast'); // Shows scroll icon

    } else {
      $('#arrow-scroll').fadeOut('fast'); // Hides scroll icon
    }
  });

  // Returns to top if user clicks on icon
  $('#arrow-scroll').on('click', function() {
    $('body, html').animate({scrollTop:0}, 500); // Smooth scrolling animation
  });
});
