$(function () {

    $('.header__btn').on('click', function () {
        $('.rightside__menu').removeClass('rightside__menu--close');
    });

    $('.rightside__menu-close').on('click', function () {
        $('.rightside__menu').addClass('rightside__menu--close');
    });

    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
    });

    $('.contact-slider').slick({
        slidesToShow: 10,
        slidesToScroll: 10,
        dots: true,
        arrows: false,
    });

    $('.article-slider__box').slick({
        prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowleft"><img src="images/arrow-slide-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowright"><img src="images/arrow-slide-right.svg" alt=""></button>'

    });

    
    var mixer = mixitup('.gallery__inner', {
        animation: {
            effectsIn: 'fade translateZ(100px)',
            effectsOut: 'fade translate(100px)',
            duration: 500
        },
        load: {
            filter: '.bedroom'
        }
    });
})