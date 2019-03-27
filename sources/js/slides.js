$(function(){
    $('#slides').slides({
        effect: 'fade',
        fadeSpeed:700,
        play: 7000,
        pause: 4000,
        generatePagination: false,
        crossfade: true,
        hoverPause: true,
        animationStart: function(current){$('.caption').animate({right:-500},200);},
        animationComplete: function(current){$('.caption').animate({right:35},300);},
        slidesLoaded: function() {$('.caption').animate({right:35},300);}
    });
});