interface ITabsOptions {
    tabButtonsSelector: string;
    tabContentsSelector: string;
    activeClass?: string;
}

/**
 * унивеrsальный таб
 * <button class="l-tab-btn js-tab-btn" data-tab="tab-1">Кнопка 1</button>
 * <button class="l-tab-btn js-tab-btn" data-tab="tab-2">Кнопка 2</button>
 *
 * <div class="l-tab-content js-tab-content" data-tab-content="tab-1">Контент 1</div>
 * <div class="l-tab-content js-tab-content" data-tab-content="tab-2">Контент 2</div>
 *
 *
 * @param {string} options.tabButtonsSelector - CSS selector for the tab buttons.
 * @param {string} options.tabContentsSelector - CSS selector for the tab contents.
 * @param {string} [options.activeClass='active'] - По умолчанию класс для активного состояния. стоит active
 */

export default function initTabs({
    tabButtonsSelector,
    tabContentsSelector,
    activeClass = 'active'
}: ITabsOptions): void {
    const tabButtons = document.querySelectorAll(tabButtonsSelector);
    const tabContents = document.querySelectorAll(tabContentsSelector);

    if (!tabButtons.length || !tabContents.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = (button as HTMLElement).dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove(activeClass));
            tabContents.forEach(content => {
                content.classList.remove(activeClass);
                // content.style.display = 'none';
            });

            button.classList.add(activeClass);
            const targetContent = document.querySelector(`${tabContentsSelector}[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add(activeClass);
                // targetContent.style.display = 'block';
            }
        });
    });
}
