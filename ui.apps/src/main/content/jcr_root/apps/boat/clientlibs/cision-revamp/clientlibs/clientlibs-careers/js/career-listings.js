
$(document).ready(function() {

    if($(window).width() < 768){
            $('.custom-dropdown').click(function(){
            $(this).toggleClass('open');
            $(this).next('.dropdown-list').toggleClass('dropdown-open').slideToggle();
        });
        $('.dropdown-list a').click(function(){
             $(this).addClass('active').siblings().removeClass('active');
             $(this).parents('.country--section').find('.custom-dropdown').removeClass('open').text($(this).text());
             $(this).parents('.dropdown-list').removeClass('dropdown-open').slideUp();
        });
    }

    $('.country--list .btn').click(function () {

      $(this).addClass('active').siblings().removeClass('active');
      var getCountry = $(this).attr('id');

      $('.jobsListing .accordion-item').removeClass('active');

      if ($(this).attr('id') == "see-all") {
           $('.jobsListing').find('.category-career').removeClass('hide');
           $('.jobsListing .accordion-item').removeClass('hide');
      } else {
           $('.jobsListing').find('.category-career').addClass('hide');
           $('.jobsListing').find('.category-career[id=' + getCountry.replace(" ", "\\ ") + ']').removeClass('hide');

           var getopening = 0;
           var gethide = 0;
           for (i = 0; i < $('.jobsListing .accordion-item').length; i++) {
                getopening = $('.jobsListing .accordion-item').eq(i).find('.category-career').length;
                gethide = $('.jobsListing .accordion-item').eq(i).find('.category-career.hide').length;
                if (getopening == gethide) {
                     $('.jobsListing .accordion-item').eq(i).addClass('hide');
                } else {
                     $('.jobsListing .accordion-item').eq(i).removeClass('hide');
                }
           }
      }

     if($('.jobsListing .accordion-item').not('.hide').length>0){
       $('.jobsListing .accordion-item').not('.hide').eq(0).find('.js-accordion-item-toggle').trigger('click');
     }
     setTimeout(function () {
        $('html, body').animate({
            'scrollTop': $(".jobsListing").offset().top
        }, 500);
    }, 1000);

      window.dispatchEvent(new Event('resize'));

    })

});