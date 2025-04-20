type CounterElements = {
    minusBtn: HTMLButtonElement;
    plusBtn: HTMLButtonElement;
    valueSpan: HTMLElement;
    input: HTMLInputElement;
};

export class CartCounter {
    private counters: CounterElements[] = [];

    constructor(selector: string) {
        document.querySelectorAll<HTMLElement>(selector).forEach(item => {
            const buttons = item.querySelectorAll<HTMLButtonElement>('.cart-blank__count-button');
            const minusBtn = buttons[0];
            const plusBtn = buttons[1];
            const valueSpan = item.querySelector<HTMLElement>('.value');
            const input = item.querySelector<HTMLInputElement>('.input-count');

            if (minusBtn && plusBtn && valueSpan && input) {
                this.counters.push({ minusBtn, plusBtn, valueSpan, input });
                this.initCounter({ minusBtn, plusBtn, valueSpan, input });
            } else {
                console.log('Ошибка в инициализации счетчика: ', {
                    minusBtn,
                    plusBtn,
                    valueSpan,
                    input
                });
            }
        });
    }

    private initCounter({ minusBtn, plusBtn, valueSpan, input }: CounterElements) {
        const getValue = () => parseInt(input.value, 10) || 0;
        const setValue = (val: number) => {
            input.value = val.toString();
            valueSpan.textContent = val.toString();
            minusBtn.classList.toggle('disabled', val <= 0);
        };

        minusBtn.addEventListener('click', e => {
            e.preventDefault();
            let value = getValue();
            if (value > 0) setValue(value - 1);
        });

        plusBtn.addEventListener('click', e => {
            e.preventDefault();
            let value = getValue();
            setValue(value + 1);
        });

        setValue(getValue());
    }
}
