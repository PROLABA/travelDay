function initDropdowns() {
    document.addEventListener('click', event => {
        const target = event.target as Element;
        const dropdown = target.closest('.js-dropdown');

        if (!dropdown) return;

        // Обработка кнопки закрытия дропдауна
        if (target.closest('.js-dropdown-close')) {
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            return;
        }

        const toggle = target.closest('.js-dropdown-btn');

        if (!toggle) {
            if (dropdown) {
                return;
            }
            document.querySelectorAll('.js-dropdown').forEach(dd => {
                dd.classList.remove('active');
            });
            return;
        }

        document.querySelectorAll('.js-dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
            }
        });

        dropdown.classList.toggle('active');
    });
}
export default initDropdowns;
