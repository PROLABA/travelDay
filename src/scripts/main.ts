import 'virtual:svg-icons-register';
import { sliderCard } from './modules/swipers/cartSlider';
import { mainSwiper } from './modules/swipers/mainSwiper';
import { mobileSearchAction } from './modules/mobileSearchAction';
import { searchAction } from './modules/searchAction';
import { swiperDiscount } from './modules/swipers/swiperDiscount';
import { faqAccordion } from './modules/faqAccordion';
import { ContactForm } from './modules/contactForm';
import { currentPromosSwiper } from './modules/swipers/currentPromosSwiper';
import { usePromocode } from './modules/promocode';
import { CartCounter } from './modules/cartBlankCounter';
import { initDialogs } from './modules/modals';
import { ImageZoomPan } from './modules/cropper';
import { thumbGallery } from './modules/swipers/thumbGallery';
import initTabs from './modules/tabs';
import { TextToggle } from './modules/textToggle';
import { dir } from 'console';

document.addEventListener('DOMContentLoaded', () => {
    searchAction();
    swiperDiscount();
    mainSwiper();
    sliderCard();
    mobileSearchAction();
    faqAccordion();
    if (document.querySelector('.contacts-blocks')) {
        new ContactForm();
    }
    if (document.querySelector('.current-promos__swiper')) {
        currentPromosSwiper();
    }
    if (document.querySelector('.promocode-input')) {
        usePromocode();
    }
    if (document.querySelector('.cart-blank__count')) {
        new CartCounter('.cart-blank__count-value');
    }
    initDialogs();
    if (document.querySelector('.select-image')) {
        const img = document.querySelector('.select-image') as HTMLElement;
        new ImageZoomPan(img);
    }
    if (document.querySelector('.excursion-gallery')) {
        thumbGallery();
    }
    // универсальный таб
    initTabs({
        tabButtonsSelector: '.js-tab-btn',
        tabContentsSelector: '.js-tab-content'
    });

    const toggler = new TextToggle('p.toggle-text', 250);
    toggler.init();

    // $(function () {
    //     $('#datepicker').datepicker();
    // });
    // $(function() { $("#e1").daterangepicker(); });
    $(function () {
        const $datepicker = $('#datepicker');

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // initMobileDatepicker();
        } else {
            initDesktopDatepicker();
        }

        function initDesktopDatepicker() {
            $datepicker.daterangepicker({
                datepickerOptions: {
                    // showOn: 'button',
                    numberOfMonths: 1,
                    minDate: 0,
                    maxDate: null,
                    firstDay: 1,
                    monthNames: [
                        'Январь',
                        'Февраль',
                        'Март',
                        'Апрель',
                        'Май',
                        'Июнь',
                        'Июль',
                        'Август',
                        'Сентябрь',
                        'Октябрь',
                        'Ноябрь',
                        'Декабрь'
                    ],
                    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                },
                open: function (input, inst) {
                    setTimeout(() => insertCustomButtons(inst.instance.element), 50);
                },
                dateFormat: 'dd.mm',
                initialText: 'Дата',
                applyButtonText: 'Применить',
                clearButtonText: '',
                cancelButtonText: '',
                presetRanges: [
                    {
                        text: 'Сегодня',
                        dateStart: function () {
                            return moment();
                        },
                        dateEnd: function () {
                            return moment();
                        }
                    },
                    {
                        text: 'Завтра',
                        dateStart: function () {
                            return moment().add('days', 1);
                        },
                        dateEnd: function () {
                            return moment().add('days', 1);
                        }
                    },
                    {
                        text: 'На выходных',
                        dateStart: function () {
                            return moment().add('days', 5 - moment().day());
                        },
                        dateEnd: function () {
                            return moment().add('days', 7 - moment().day());
                        }
                    }
                ],
                applyOnMenuSelect: false
            });
        }

        function initMobileDatepicker() {
            $datepicker.daterangepicker({
                minDate: 0,
                numberOfMonths: 12,
                stepMonths: 2,
                showCurrentAtPos: 0,
                showOn: 'focus',
                beforeShow: function (input, inst) {
                    setTimeout(() => {
                        insertCustomButtons(inst.dpDiv);
                        // setupScrollHandler(inst.dpDiv);
                    }, 10);
                }
            });
        }

        // $datepicker.datepicker({
        //     numberOfMonths: 2,
        //     showCurrentAtPos: 0,
        //     stepMonths: 2,
        //     minDate: 0,
        //     showOn: 'button',
        //     beforeShow: function (input, inst) {
        //         setTimeout(function () {
        //             insertCustomButtons(inst.dpDiv);
        //             setupScrollHandler(inst.dpDiv);
        //         }, 50);
        //     }
        // });

        $('#date-button').click(function (e) {
            e.preventDefault();
            $datepicker.daterangepicker('open');
        });

        function insertCustomButtons($dpDiv) {
            const $modalBodyContent = $('.comiseo-daterangepicker-main .comiseo-daterangepicker-presets');
            if ($modalBodyContent.find('.dp-custom-header').length) return; // уже добавлены

            const $wrapper = $('.datepicker-custom');

            const title = $wrapper.data('title');
            const descr = $wrapper.data('descr');
            // const buttons = JSON.parse($wrapper.attr('data-buttons') || '[]');

            const $btnContainer = $('<div class="dp-custom-header"></div>');

            if (title) {
                $btnContainer.append(`<h5 class="h4">${title}</h5>`);
            }

            if (descr) {
                $btnContainer.append(`<p class="description">${descr}</p>`);
            }

            $modalBodyContent.prepend($btnContainer);
        }

        // function setupScrollHandler($dpDiv) {
        //     $dpDiv.off('scroll').on('scroll', function () {
        //         const scrollBottom = $dpDiv[0].scrollHeight - $dpDiv.scrollTop() - $dpDiv.outerHeight();

        //         // Если прокручено до низа
        //         if (scrollBottom < 10) {
        //             const currentDate = $datepicker.daterangepicker('getDate') || new Date();

        //             // Сдвигаем на 2 месяца вперёд
        //             currentDate.setMonth(currentDate.getMonth() + 2);
        //             $datepicker.daterangepicker('setDate', currentDate);
        //             $datepicker.daterangepicker('refresh');
        //         }
        //     });
        // }
    });
});
