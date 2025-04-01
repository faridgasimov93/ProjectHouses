'use strict'

$(document).ready(() => {

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    const menu = $('.menu');
    // открытие меню при клике
    $('.header__menu-icon').click(function () {
        menu.css('display', 'flex');
    })
    //закрытие меню
    $('.menu__close-icon').click(function () {
        menu.css('display', 'none');
    });

    //параметры для увеличение фото
    lightbox.option({
        'resizeDuration': 700,
        'wrapAround': true,
        'disableScrolling': true,
        'fitImagesInViewport': true
    })

    // показывает 3 доп блока при клике
    $('.projects__show-extra').click(function () {
        $('.show-more').removeClass('show-more')
        $('.projects__show-extra').css("display", "none")
    })

    // показывает плашку с описанием при клике
    $('.technology__ellipse').click(function () {
        // Переменная для получения номера блока, который нужно отобразить
        let blockNumber = $(this).data('block');
        // Скрывает все блоки, кроме того, который надо отобразить
        $('.technology__box').not('.technology__box--position-' + blockNumber).hide();
        // Показывает или скрывает блок при клике
        $('.technology__box--position-' + blockNumber).toggle();
    })

    // слайдер для фото
    new Swiper('.swiper', {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        shadowPerProgress: false,
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 1,
            depth: 500,
            modifier: 1,
            scale: 1,
            slideShadows: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: "auto",
                spaceBetween: 40,
            },
        },
        keyboard: {
            enable: true,
            onlyInViewport: true,

        },
        speed: 500,
    });

    // скрол к блоку с формой для связи
    $('.call-order-scroll').on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $('.consulting__block').offset().top
        }, 500);
    });

    let phoneNumber = $('#phone-mask');

    //валидация формы и замена блока с формой на блок с текстом
    $('#submit').click(function () {
        let name = $('#name');
        let checkbox = $('#checkbox');
        let hasError = false;

        $('.error-input').hide();
        $('.error-border').removeClass('error-border');

        if (!name.val()) {
            name.next().show();
            name.addClass('error-border');
            hasError = true
        }
        if (!phoneNumber.val()) {
            phoneNumber.next().show();
            phoneNumber.addClass('error-border');
            hasError = true
        }
        if (!checkbox.is(':checked')) {
            checkbox.parent().find('.error-input').show();
            hasError = true
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phoneNumber: phoneNumber.val(), checkbox: checkbox.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        $('#form').remove();
                        $('.consulting__popup').css('display', 'flex');

                    } else {
                        alert('Неверное имя');
                    }
                    console.log(msg);
                });
        }
    })


    //открывает popup
    $('.tour__button').click(function () {
        $('.tour__popup').css('display', 'block');
    });

    //закрывает popup
    $('.tour__popup-close').click(function () {
        $('.error-popup-border').removeClass('error-popup-border');
        $('.error-input').hide();
        $('.tour__popup').css('display', 'none');
    });

    // Валидация формы в popup
    $('#popup-submit').click(function () {

        let popupName = $('#popup-name');
        let popupPhone = $('#popup-phone-mask');
        let popupCheckbox = $('#popup-checkbox');
        let hasError = false;

        $('.error-popup-border').removeClass('error-popup-border');
        $('.error-input').hide();

        if (!popupName.val()) {
            popupName.next().show();
            popupName.addClass('error-popup-border');
            hasError = true;
        }
        if (!popupPhone.val()) {
            popupPhone.next().show();
            popupPhone.addClass('error-popup-border');
            hasError = true
        }
        if (!popupCheckbox.is(':checked')) {
            popupCheckbox.parent().find('.error-input').show();
            hasError = true
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: popupName.val(), phoneNumber: popupPhone.val(), checkbox: popupCheckbox.val()}
            })
                .done(function (msg) {
                    if (msg.success) {
                        $('#popup-form').remove();
                        $('.tour__popup-success').css('display', 'flex');

                    } else {
                        alert('Неверное имя');
                    }
                    console.log(msg);
                });
        }
    });

});
