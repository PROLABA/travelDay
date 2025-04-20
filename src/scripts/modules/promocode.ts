export const usePromocode = () => {
    const input = document.querySelector('.promocode-input input') as HTMLInputElement;
    const button = document.querySelector('.promocode-button') as HTMLButtonElement;

    input.addEventListener('input', () => {
        const value = input.value.trim();
        if (value.length > 2) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
        }
    });
};
