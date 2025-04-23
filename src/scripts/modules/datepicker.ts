const initCustomDatepicker = () => {
    const monthNames = [
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
    ];
    const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayNamesMin = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    $(function () {
        const $datepicker = $('#datepicker');

        const isMobile = window.innerWidth < 768;

        // if (isMobile) {
        //     initMobileDatepicker();
        // } else {
        // }
        initDesktopDatepicker();

        function initDesktopDatepicker() {
            ($datepicker as any).daterangepicker({
                datepickerOptions: {
					showCurrentAtPos: 0,
                    numberOfMonths: isMobile ? 12 : 1,
                    minDate: 0,
                    // maxDate: isMobile ? 12 : null,
                    maxDate: null,
                    showOn: 'focus',
                    firstDay: 1,
                    monthNames: monthNames,
                    dayNames: dayNames,
                    dayNamesMin: dayNamesMin
                },

                dateFormat: 'dd.mm',
                initialText: 'Дата',
                applyButtonText: 'Применить',
                clearButtonText: isMobile ? 'Сбросить' : '',
                cancelButtonText: '',
				autoFitCalendars: isMobile ? false : true,
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
                // applyOnMenuSelect: false, // закрывает меню если кликнули по кнопкам в шапке
                open: function () {
                    setTimeout(() => insertCustomButtons(), 50);
                },
                icon: 'custom-date-icon'
            });
        }

        // function initMobileDatepicker() {
        //     $datepicker.daterangepicker({
        //         datepickerOptions: {
        //             minDate: 0,
        //             numberOfMonths: 12,
        //             // stepMonths: 1,
        //             showCurrentAtPos: 0,
        //             showOn: 'focus'
        //         },
        //         open: function () {
        //             setTimeout(() => insertCustomButtons(), 50);
        //         }
        //     });
        // }

        $('#date-button').click(function (e) {
            e.preventDefault();
            $datepicker.daterangepicker('open');
        });

        $('#custom-date-clear').click(e => {
            e.preventDefault();
            $datepicker.daterangepicker('clearRange');
        });

        function insertCustomButtons() {
            const $modalBodyContent = $('.comiseo-daterangepicker-main .comiseo-daterangepicker-presets');

            if ($modalBodyContent.find('.dp-custom-header').length) return; // уже добавлены

            const $wrapper = $('.datepicker-custom');

            const title = $wrapper.data('title');
            const descr = $wrapper.data('descr');

            const $btnContainer = $('<div class="dp-custom-header"></div>');

            if (title) {
                $btnContainer.append(`<h5 class="h4">${title}</h5>`);
            }

            if (descr) {
                $btnContainer.append(`<p class="description">${descr}</p>`);
            }

            $modalBodyContent.prepend($btnContainer);
        }
    });
};
export default initCustomDatepicker;
