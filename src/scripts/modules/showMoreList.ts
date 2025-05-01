export function initShowMoreList(): void {
    const lists = document.querySelectorAll('.js-list-show-more');

    if (lists.length === 0) return;

    lists.forEach((ul: Element) => {
        const htmlUl = ul as HTMLElement;
        const items = htmlUl.children;

        if (items.length > 4) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'text-toggle-btn';
            toggleButton.textContent = 'Показать больше';
			toggleButton.dataset.collapsed = 'true';
            htmlUl.insertAdjacentElement('afterend', toggleButton);

            for (let i = 4; i < items.length; i++) {
                items[i].classList.add('hidden');
            }

            toggleButton.addEventListener('click', () => {
                const isCollapsed = toggleButton.dataset.collapsed === 'true';
                const newCollapsedState = !isCollapsed;

                for (let i = 4; i < items.length; i++) {
                    if (newCollapsedState) {
                        items[i].classList.add('hidden');
                    } else {
                        items[i].classList.remove('hidden');
                    }
                }

                toggleButton.dataset.collapsed = String(newCollapsedState);
                toggleButton.textContent = newCollapsedState ? 'Показать больше' : 'Показать меньше';
            });
        }
    });
}
