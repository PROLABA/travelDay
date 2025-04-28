function initDropdowns() {
    document.addEventListener('click', event => {
        const toggle = (event.target as Element).closest('.js-dropdown-btn');
        if (!toggle) {
            // Если клик вне дропдауна, закрыть все
            document.querySelectorAll('.js-dropdown').forEach(dd => {
                dd.classList.remove('active');
            });
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('catalog-active');
            return;
        }

        // Найти родительский элемент дропдауна
        const dropdown = toggle.closest('.js-dropdown');
        if (!dropdown) return;

        document.querySelectorAll('.js-dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
            }
        });

        dropdown?.classList.toggle('active');
        if (toggle.classList.contains('js-catalog-btn')) {
            document.documentElement.classList.toggle('no-scroll');
            document.body.classList.toggle('no-scroll');
            document.body.classList.toggle('catalog-active');
        } else {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('catalog-active');
        }
    });
}
export default initDropdowns;
