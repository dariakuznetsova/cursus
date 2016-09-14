"use strict";


$(document).ready(function() {

    $("select").selectOrDie();
});


//форма регистрации
$(document).ready(function () {
    var $loginLink = $('.j-user_inactive');
    var $loginForm = $('.j-header__user');

    $loginLink.on('click', function() {
        $loginForm.toggleClass('form-visible');
        $loginForm.find('.j-login-form').fadeToggle(200);
    })
});


//меню гамбургер
$(document).ready(function () {
    var $hamburgerLink = $('.j-hamburger-link');
    var $hamburgerMenu = $('.j-hamburger-menu');

    $hamburgerLink.on('click', function() {
        $hamburgerMenu.toggleClass('menu-visible header__hamburger-menu-768');
        $hamburgerMenu.find('.hamburger-menu-list').fadeToggle(200);
        $(this).toggleClass('hamburger-link-768');
        $('.main-container').toggleClass('main-container-768');
        $('.main-content').toggleClass('main-content-768');
        $('.j-header__user').toggleClass('z-index-hide');
    })
});


//гамбургер, внутреннее меню
$(document).ready(function () {
    var $hamburgerInnerLink = $('.hamburger-menu__item-link');

    $hamburgerInnerLink.on('click', function() {
        var $this = $(this);

        $this.parent('.j-hamburger-item_inner').toggleClass('height-auto');

    });

});


//aside accordion
$(document).ready(function () {
    var asideLink = $('.j-search-form-link');
    var inputInner = $('.j-inner-list').find('>label');

    asideLink.on('click', function() {
        var $this = $(this);

        $(this).find('svg').toggleClass('rotate');
        $this.next('.j-inner-list').slideToggle(200);
    });

    inputInner.on('click', function() {
        var $this = $(this);
        var inputCheckbox = $this.find('input[type=checkbox]');
        var innerLabel = $this.find('.j-inner_inputs');
        var $thisSvg = $this.find('>svg');

        if ((inputCheckbox).is(':checked')) {
            innerLabel.slideDown(100);
            $thisSvg.addClass('half-rotate');
        }else{
            innerLabel.slideUp(100);
            $thisSvg.removeClass('half-rotate');
        }
    });

});




//доабвление поля 'другой вариант'
$(document).ready(function () {
    var $inputOtherLink = $('.input__other-options');
    var $inputOther = $('.j-registration-input');

    $inputOtherLink.on('click', function() {
        if (($inputOtherLink).is(':checked')) {
            $inputOther.show();
        }else{
            $inputOther.hide();
        }
    });

    var label = $('.j-label-block').find('>label');
    var input = label.find('.checked_elem');

    input.on('click', function() {
        var $this = $(this);

        if (($this).is(':checked')) {
            $this.siblings('.checkbox-fake').find('svg').show();
        }else{
            $this.siblings('.checkbox-fake').find('svg').hide();
        }
    });

});



//Переключение цифр в input в регистрации
$(document).ready(function () {
    var minus_link = $('.j-more');
    var plus_link = $('.j-less');

    function incrementValue(e){

        var valueElement = $(this).siblings('input');
        valueElement.val(Math.max(parseInt(valueElement.val()) + e.data.increment, 0));
        //return true;
    }

    plus_link.bind('click', {increment: 1}, incrementValue);
    minus_link.bind('click', {increment: -1}, incrementValue);
});



//Очистка фильтра в aside
(function () {
    var clean_filter = $('.reset-button'),
        form = $('.search-form-list').find('.checked_elem'),
        amountInputs = $('.price-ui-slider').find('input'),
        uiSlider = $(".slider-range"),
        $inputPlace = $('.ferrymen').find('.ferrymen-list__place-input');

    clean_filter.on('click', function(e) {
        e.preventDefault();
        form.removeAttr('checked');
        amountInputs.eq(0).val('0');
        amountInputs.eq(1).val('100000');
        uiSlider.slider("values",0,'0');
        uiSlider.slider("values",1,'100000');
        $inputPlace.val('');
    });

}());


//Показать/Скрыть карту
(function () {
    var mapLink = $('.j-show-map');
    var map = $('.search-content').find('.map');

    mapLink.on('click', function() {
        map.toggleClass('map-show');
    })

}());


//Показать/Скрыть инпут в хэдере
$(document).ready(function () {
    var $inputLink = $('.j-input-link');
    var $input = $('.j-header-input');

    $inputLink.on('click', function() {
        $input.fadeToggle(200);
    })
});

$(document).click(function (event) {
    var $inputLink = $('.j-input-link');
    var $container = $inputLink.parent('.j-header__search');
    var $input = $('.j-header-input');

    if ($container.has(event.target).length === 0){
        $input.fadeOut(200);
    };
});




//AJAX!!!

$(document).ready(function () {
    //var $registrationButton = $('.registration-form').find('button');
    var $registrationStep = $('.registration__step');
    var $registrationForm = $('#registration-form');
    var formStep = 1;

    $.validator.methods.regExp = function(value, element) {
        return this.optional( element ) || /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test( value );
    };

    $.validator.methods.passRepeat = function(value, element) {
        var password = $registrationForm.find('input[name=password]').val();

        return this.optional( element ) || password == value;
    };

    function stepHigher(step){
        return formStep>=step;
    }

    $registrationForm.validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            surname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email:true
            },
            tel: {
                required: true,
                regExp: true

            },
            organization: {
                required: {
                    depends: stepHigher(2)
                },
                minlength: 3
            },
            country: {
                required: {
                    depends: stepHigher(2)
                },
                minlength: 3
            },
            city: {
                required: {
                    depends: stepHigher(2)
                },
                minlength: 3
            },
            address: {
                required: {
                    depends: stepHigher(2)
                },
                minlength: 3
            },
            'goods[]': {
                required: {
                    depends: stepHigher(3)
                }
            },
            selectTransport: {
                required: {
                    depends: stepHigher(3)
                }
            },
            login: {
                required: {
                    depends: stepHigher(4)
                },
                minlength: 6
            },
            password: {
                required: {
                    depends: stepHigher(4)
                },
                minlength: 6
            },
            passwordRepeat: {
                required: {
                    depends: stepHigher(4)
                },
                passRepeat: true,
                minlength: 6
            },
            otherOptions: {
                required: true
            }
        },

        messages: {
            name: "Введите Ваше имя",
            surname: "Введите Вашу фамилию",
            email: {
                required: "Введите Вашу почту",
                email: "Введите почту в формате name@domain.com"
            },
            tel: {
                required: "Введите Ваш телефон",
                regExp: "Введите телефон в формате 89001234567"
            },
            organization: "Введите название организации",
            country: "Выберите страну проживания",
            city: "Выберите город",
            address: "Введите адрес",
            'goods[]': "Выберите наименование",
            login:  {
                required: "Введите логин",
                minlength: 'Минимальное количество симоволов - 6'
            },
            password:  {
                required: "Введите пароль",
                minlength: 'Минимальное количество симоволов - 6'
            },
            passwordRepeat:  {
                required: "Повторите пароль",
                passRepeat: "Пароли не сопадают"
            },
            otherOptions: {
                required: "Введите свой вариант",
            }
        },

        submitHandler: function(registrationForm) {
            var $registrationForm = $(registrationForm);
            var registrationCounterLink = $('.registration-counter').find('a');

            var stepChange = function() {

                var blockChange = function() {
                    $registrationStep.eq(formStep).fadeIn(200)
                        .siblings().hide();
                    registrationCounterLink.removeClass('registration__item_active');
                    registrationCounterLink.eq(formStep).addClass('registration__item_active');
                    formStep++;
                };

                if(formStep < 4) {
                    blockChange();
                } else if (formStep = 4) {
                    blockChange();
                    $('.registration-counter').addClass('opacity0');
                }
            };


            var formArr = $registrationForm.serialize();

            $.ajax({
                type: "GET",
                url: $registrationForm.attr('action'),
                data: formArr,
                success: function(data) {
                    if (typeof data != "object") data = JSON.parse(data);
                    if (data.success) {
                        stepChange();
                    }
                }
            });
            //return false;

        }

    });

});




//Слайдер в cargo-search
$(document).ready(function () {
    var $menuGallery = $('.j-content-slider');
    var $prevLink = $('.j-link-prev');
    var $nextLink = $('.j-link-next');

    $('.j-content-slider').slick({
        arrows:false,
        infinite: true,
        slidesToShow:   3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $prevLink.click(function () {
        $menuGallery.slick('slickPrev');
    });

    $nextLink.click(function () {
        $menuGallery.slick('slickNext');
    });

});


//slider in aside
$(document).ready(function () {

    $(".slider-range").slider({
        range: true,
        min: 0,
        max: 200000,
        values: [0,100000],
        stop: function(event, ui) {
            $("#from").val($(".slider-range").slider("values",0));
            $("#to").val($(".slider-range").slider("values",1));
        },
        slide: function( event, ui ) {
            $("#from").val($(".slider-range").slider("values",0));
            $("#to").val($(".slider-range").slider("values",1));
        }
    });

    $("#from").change(function(){
        var value1=$("#from").val();
        var value2=$("#to").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $("#from").val(value1);
        };
        $(".slider-range").slider("values",0,value1);
    });

    $("#to").change(function(){
        var value1=$("#from").val();
        var value2=$("#to").val();

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $("#to").val(value2);
        };
        $(".slider-range").slider("values",1,value2);
    });

});


//Показать/скрыть aside при <992
$(document).ready(function () {
    var $showLink = $('.j-page-title-link');
    var $aside = $('.search-aside');
    var $filterBlock = $('.cargo-search__filters');

    $showLink.on('click', function() {
        $aside.slideToggle(200);
        $filterBlock.slideToggle(200);
        $(this).find('.icon-wrapper').toggleClass('rotate');
    });

    function windowSize(){
        if($(window).width() <= 992) {
            $aside.hide();
            $filterBlock.hide();
        }else {
            $showLink.find('.icon-wrapper').removeClass('rotate');
            $aside.show();
            $filterBlock.show();
        }
    };

    windowSize();

    $(window).on('resize', function() {
        windowSize();
    })

});


//gallery in item
$(document).ready(function () {
    var $smallPic = $('.item-gallery__small-pics').find('img');
    var $bigPic = $('.item-gallery__big-pic').find('img');

    $smallPic.on('click', function() {
        var $this = $(this);
        var $smallPicAttr = $this.attr('src');

        $($bigPic).fadeOut(200, function () {
            $($bigPic).attr('src', $smallPicAttr).fadeIn(200);
        });
    });

});


//Плавный переход по якорной ссылке
$(document).ready(function(){

    $(".j-rate-link").on("click", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top - 100 + 'px'}, 700);
    });

});



//страница груза, инпуты disabled if
$(window).load(function() {
    var $rateForm = $('#rateForm');
    var $inputWrapper = $rateForm.find('.j-inner-wrap');
    var $inputRadio = $rateForm.find('input[type=radio]');
    var $inputRadio1 = $rateForm.find('input[name=radio1]');
    var $inputRadio2 = $rateForm.find('input[name=radio2]');
    var $inputDays = $rateForm.find('input[name=days]');
    var $select = $inputWrapper.find('select');
    var $inputFrom = $rateForm.find('input[name=timeFrom]');
    var $inputTo = $rateForm.find('input[name=timeTo]');

    $inputRadio1.eq(0).attr('checked','checked');
    $inputRadio2.eq(0).attr('checked','checked');

    var inputsDisabled1 = function() {
        $inputFrom.attr('disabled','disabled').val('');
        $inputTo.attr('disabled','disabled').val('');
        $select.selectOrDie("disable");
        $inputDays.removeAttr('disabled');
    };

    inputsDisabled1();

    $inputRadio.on('click', function() {
        var $this = $(this);
        $this.parent($inputWrapper).siblings($inputWrapper).find('input[type=text]').attr('disabled','disabled').val('');
        $this.siblings($inputDays,$inputFrom,$inputTo).removeAttr('disabled').val('');
        $this.parent($inputWrapper).siblings($inputWrapper).find('.sort-by').find($select).selectOrDie("disable");
        $this.siblings('.sort-by').find($select).selectOrDie("enable");
    });

});



//ferryman popup
$(document).ready(function(){

    var $popupLink = $('.ferryman-rate').find('.know-more');
    var $popupContainer = $('.j-popup-container');
    var $body = $('body');

    $popupLink.on('click', function() {
        var $this = $(this);
        var $thisPopup = $this.siblings('.j-ferryman-popup');
        var $bodyScrollTop = $body.scrollTop();

        $thisPopup.clone().appendTo($popupContainer);
        $popupContainer.fadeIn(300).find('.ferryman-popup').css({'margin-top':$bodyScrollTop+150+'px'}).fadeIn(300);

        var $closeLink = $popupContainer.find('.j-popup-close-link');
        $closeLink.on('click', function() {
            $popupContainer.hide().empty();
        })
    })
});



//Переключение вкладок в отзывах
$(document).ready(function(){
    var refLink = $('.j-ref-link');
    var goodRefList = $('.j-good-ref-list');
    var badRefList = $('.j-bad-ref-list');
    var allRefList = $('.j-all-ref-list');

    refLink.on('click', function() {
        var $this = $(this);

        refLink.removeClass('active');
        $this.addClass('active');

        if ($this.index() == 0) {
            badRefList.hide();
            allRefList.hide();
            goodRefList.show();
        } else if ($this.index() == 1) {
            goodRefList.hide();
            allRefList.hide();
            badRefList.show();
        } else if ($this.index() == 2) {
            goodRefList.hide();
            badRefList.hide();
            allRefList.show();
        }
    })

});


//Выбрать все инпуты при клике на верхнем (письма)
$(document).ready(function () {
    var $checkAllInput = $('.check-all-input');
    var $messageInput = $('.message-input');

    $checkAllInput.change(function() {
        var $this = $(this);

        if ($this.is(':checked')) {
            $messageInput.prop('checked', true);
            console.log('checked!');
        } else {
            $messageInput.prop('checked', false);
            console.log('unchecked!');
        }

    });
});


//Progress bar
$(document).ready(function () {
    $(".progressbar").progressbar({
        value: 70
    });
});



//страница personal, инпуты disabled if
$(window).load(function() {
    var $transactionForm = $('#transactionForm');
    var $inputWrapper = $transactionForm.find('.inner-list__wrap');
    var $inputRadio = $transactionForm.find('input[type=radio]');
    var $select = $inputWrapper.find('select');
    var $inputFrom = $transactionForm.find('input[name=timeFrom]');
    var $inputTo = $transactionForm.find('input[name=timeTo]');

    $inputRadio.eq(0).attr('checked','checked');

    var inputsDisabled = function() {
        $inputFrom.attr('disabled','disabled').val('');
        $inputTo.attr('disabled','disabled').val('');
    };

    inputsDisabled();

    $inputRadio.on('click', function() {
        var $this = $(this);

        $this.parent($inputWrapper).siblings($inputWrapper).find('input[type=text]').attr('disabled','disabled').val('');
        $this.siblings($inputFrom,$inputTo).removeAttr('disabled').val('');
        $this.parent($inputWrapper).siblings($inputWrapper).find('.sort-by').find($select).attr('disabled', true).trigger("chosen:updated");
        $this.siblings('.sort-by').find($select).removeAttr('disabled').trigger("chosen:updated");
    });

});


//Календарь
$(document).ready(function() {
    $('#calendar').fullCalendar({
        locale: 'ru',
        height:400,
        events: '/local/templates/main/calendar.json',
        eventClick: function(event) {
            if (event) {
                $('.calendar-events').empty().append('<div><span class="dayDate">' + event.dayDate + ' :' + '</span>' + '<span>' + event.title + '</span></div>');
                return false;
            }
        }
    });
});


//Добавление наименований при клике на +-инпут
//$(document).ready(function () {
//    var $itemsInput = $('.j-items-quantity');
//    var $plusLink = $itemsInput.siblings('.less');
//    var $minusLink = $itemsInput.siblings('.more');
//    var $itemsContainer = $('.j-request__item-description');
//    var $item = $('.j-request__item').eq(0);
//
//    $plusLink.on('click', function() {
//        var $newitem = $item.clone();
//
//        $itemsContainer.append($newitem);
//    });
//    $minusLink.on('click', function() {
//        var $item = $('.j-request__item');
//        $item.last().remove();
//    });
//
//    $itemsInput.change(function() {
//        var $value = $itemsInput.val();
//        console.log($value);
//    });
//});




//AJAX заявка
$(document).ready(function () {
    var $registrationStep = $('.registration__step');
    var $requestForm = $('#requestForm');
    var registrationCounterLink = $('.registration-counter').find('a');
    var formStep = 1;

    function stepHigher(step){
        return formStep>=step;
    }

    $('.back-link').on('click', function() {
        var regStep = $('.registration__step');
        var $this = $(this);
        formStep = formStep - 1;
        $this.closest(regStep).hide().prev(regStep).fadeIn(200);
        registrationCounterLink.removeClass('registration__item_active');
        registrationCounterLink.eq(formStep - 1).addClass('registration__item_active');

    })

    $requestForm.validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            //length: {
            //    required: true,
            //    minlength: 3
            //},
            //width: {
            //    required: true,
            //    minlength: 3
            //},
            //height: {
            //    required: true,
            //    minlength: 3
            //},
            //weight: {
            //    required: true,
            //    minlength: 3
            //},
            //message: {
            //    required: true,
            //    minlength: 3
            //},
            'goods[]': {
                required: true
            },
            details: {
                required: true,
                minlength: 3
            },
            selectSendPlace: {
                required: {
                    depends: stepHigher(2)
                }
            },
            sendPlace: {
                required: {
                    depends: stepHigher(2)
                }
            },
            sendTime: {
                required: {
                    depends: stepHigher(2)
                }
            },
            selectSendTime: {
                required: {
                    depends: stepHigher(2)
                }
            },
            selectDeliverPlace: {
                required: {
                    depends: stepHigher(2)
                }
            },
            deliverPlace: {
                required: {
                    depends: stepHigher(2)
                }
            },
            deliverTime: {
                required: {
                    depends: stepHigher(2)
                }
            },
            selectDeliverTime: {
                required: {
                    depends: stepHigher(2)
                }
            },
            userName: {
                required: {
                    depends: stepHigher(3)
                }
            },
            userSurname: {
                required: {
                    depends: stepHigher(3)
                }
            },
            email: {
                required: {
                    depends: stepHigher(3)
                },
                email:true
            },
            password: {
                required: {
                    depends: stepHigher(3)
                }
            }

        },

        messages: {
            name: "Введите название",
            length: "Введите длину",
            width: "Введите ширину",
            height: "Введите высоту",
            weight: "Введите вес",
            country: "Выберите страну проживания",
            city: "Выберите город",
            address: "Введите адрес",
            'goods[]': "Выберите наименование",
            login: {
                required: "Введите логин",
                minlength: 'Минимальное количество симоволов - 6'
            },
            password: {
                required: "Введите пароль",
                minlength: 'Минимальное количество симоволов - 6'
            },
            passwordRepeat: {
                required: "Повторите пароль",
                passRepeat: "Пароли не сопадают"
            },
            otherOptions: {
                required: "Введите свой вариант"
            },
            deliverPlace: "Введите адрес",
            sendPlace: "Введите адрес",
            userName: "Введите Ваше имя",
            userSurname: "Введите Вашу фамилию",
            email: {
                required: "Введите Вашу почту",
                email: "Введите почту в формате name@domain.com"
            },
        },

        submitHandler: function($requestForm) {
            var $requestForm = $($requestForm);
            //var registrationCounterLink = $('.registration-counter').find('a');

            var stepChange = function() {

                var blockChange = function() {
                    $registrationStep.eq(formStep).fadeIn(200)
                        .siblings().hide();
                    registrationCounterLink.removeClass('registration__item_active');
                    registrationCounterLink.eq(formStep).addClass('registration__item_active');
                    formStep++;
                };

                if(formStep < 5) {
                    blockChange();
                }
            };


            var formArr = $requestForm.serialize();

            $.ajax({
                type: "GET",
                url: $requestForm.attr('action'),
                data: formArr,
                success: function(data) {
                    if (typeof data != "object") data = JSON.parse(data);
                    if (data.success) {
                        stepChange();
                    }
                }
            });
            return false;

        }
    });
});


//считаем комиссию в "разместить заявку"
$(document).ready(function () {
    $('.price-without-fee').find('input').on('input', function() {
        var value = $(this).val();
        var inputFee = $('.price-with-fee').find('input');

        inputFee.val(value*1.1); //например, со скидкой 10%
    });
});


//выбор картинок в input
$(document).ready(function () {
    $('.request__item-pictures').find('input').on('change', function() {
        $(this).siblings('.checkbox-fake').addClass('pic-loaded');
    })
});



