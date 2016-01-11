$(document).ready(function() {
  $('.hero-content h3').click(function() {
    console.log('hello!');

    var subText = $(this).text();
    $(this).text(subText + subText + subText + "!");
  });

  $('.selling-points .point').hover(
        
               function () {
                  $(this).animate({'margin-top': '10px'});
               }, 
        
               function () {
                  $(this).animate({'margin-top': '0px'});
               }
            );
});