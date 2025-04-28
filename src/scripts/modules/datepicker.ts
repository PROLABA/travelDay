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

    const testDays = ['2025-04-29', '2025-04-30', '2025-05-01', '2025-10-02'];
    $(function () {
        const $datepicker = $('#datepicker-range');
        const isMobile = window.innerWidth < 768;

        // Проверка атрибута data-range
        const isRangeMode = $datepicker.closest('[data-range]')?.data('range') === true;

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
                    dayNamesMin: dayNamesMin,
                    onSelect: function (date, ins) {
                        if (!isRangeMode) {
                            const { currentYear, currentMonth, currentDay } = ins;
                            const selectedDate = new Date(currentYear, currentMonth, currentDay);
                            console.dir(selectedDate);

                            $datepicker.daterangepicker('setRange', { start: selectedDate });
                            setTimeout(() => {
                                // $datepicker.daterangepicker('clearRange');
                                $datepicker.daterangepicker('close');
                            }, 150);
                        }
                    },
                    beforeShowDay: function (date) {
                        const formattedDate = $.datepicker.formatDate('yy-mm-dd', date);
                        return [testDays.includes(formattedDate)];
                    }
                },
                isRange: isRangeMode,
                dateFormat: 'dd.mm',
                initialText: 'Дата',
                applyButtonText: isRangeMode ? 'Применить' : '',
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
