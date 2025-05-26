export default function initCatalogAside() {
    const openBtn = document.querySelector('.js-aside-btn');
    const asideMenu = document.querySelector('.js-aside-menu');
    const closeBtn = document.querySelector('.js-aside-close');

    if (!openBtn || !asideMenu) return;

    openBtn?.addEventListener('click', () => {
        asideMenu.classList.toggle('active');
    });

    asideMenu?.addEventListener('click', e => {
        if (e.target === asideMenu) {
            asideMenu.classList.remove('active');
        }
    });

    closeBtn?.addEventListener('click', () => {
        asideMenu.classList.remove('active');
    });
}
