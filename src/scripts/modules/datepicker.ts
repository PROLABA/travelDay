const initCustomDatepicker = () => {
    $(function () {
        const $datepicker = $('#datepicker');

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // initMobileDatepicker();
        } else {
            initDesktopDatepicker();
        }

        function initDesktopDatepicker() {
            let clickCount = 0;
            let startDate = null;
            let endDate = null;

            ($datepicker as any).daterangepicker({
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
                // applyOnMenuSelect: false, // закрывает меню если кликнули по кнопкам в шапке
                open: function () {
                    setTimeout(() => insertCustomButtons(), 50);
                },
                icon: 'custom-date-icon'
                // change: function (e) {
                //     console.dir(e);
                //     console.dir('dsada');
                // }
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
            // вручную удаляем классы
            $datepicker.daterangepicker('open');
        });

        $('#custom-date-clear').click(e => {
            e.preventDefault();
            $datepicker.daterangepicker('clearRange');
        });
        $('#date-button-clear').click(e => {
            e.preventDefault();
            $('#custom-date-clear').click();
        });

        function insertCustomButtons() {
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
};
export default initCustomDatepicker;
