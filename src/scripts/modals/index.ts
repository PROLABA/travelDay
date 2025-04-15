export function initDialogs(): void {
    const openButtons = document.querySelectorAll<HTMLElement>('[data-modal-target]');
    const closeButtons = document.querySelectorAll<HTMLElement>('[data-modal-close]');

    if (!openButtons.length && !closeButtons.length) return;

    openButtons.forEach(button => {
        const targetClass = button.dataset.modalTarget;
        if (!targetClass) return;

        button.addEventListener('click', () => {
            const dialog = document.querySelector(`.${targetClass}`) as HTMLDialogElement | null;
            if (dialog?.showModal) {
                dialog.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('dialog') as HTMLDialogElement | null;
            dialog?.close();
        });
    });
}
