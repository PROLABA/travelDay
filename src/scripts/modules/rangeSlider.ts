export class RangeSlider {
    private fromSlider: HTMLInputElement;
    private toSlider: HTMLInputElement;
    private fromInput: HTMLInputElement;
    private toInput: HTMLInputElement;
    private fromClearBtn: HTMLButtonElement;
    private toClearBtn: HTMLButtonElement;
    private controlSlider: HTMLElement;
    private sliderColor = '#DFDFDF';
    private rangeColor = '#7F56D9';

    constructor(container: HTMLElement) {
        this.fromSlider = container.querySelector('.js-range-slider-from-slider')!;
        this.toSlider = container.querySelector('.js-range-slider-to-slider')!;
        this.fromInput = container.querySelector('.js-range-slider-from-input')!;
        this.toInput = container.querySelector('.js-range-slider-to-input')!;
        this.fromClearBtn = container
            .querySelector('.js-range-slider-from-input')
            ?.parentElement?.querySelector('.range-slider__clear-btn')! as HTMLButtonElement;
        this.toClearBtn = container
            .querySelector('.js-range-slider-to-input')
            ?.parentElement?.querySelector('.range-slider__clear-btn')! as HTMLButtonElement;
        this.controlSlider = this.toSlider;

        if (!this.fromSlider || !this.toSlider || !this.fromInput || !this.toInput) {
            console.error('RangeSlider elements not found within the container:', container);
            return;
        }

        this.init();
    }

    private init(): void {
        this.updateSliderValues();
        this.fillSlider();
        this.setupEventListeners();
    }
    private updateSliderValues(): void {
        this.fromInput.value = this.fromSlider.value;
        this.toInput.value = this.toSlider.value;
    }

    private setupEventListeners(): void {
        this.fromSlider.oninput = () => this.controlFromSlider();
        this.toSlider.oninput = () => this.controlToSlider();
        this.fromInput.oninput = () => this.controlFromInput();
        this.toInput.oninput = () => this.controlToInput();

        if (this.fromClearBtn) {
            this.fromClearBtn.onclick = () => this.clearFromInput();
        }

        if (this.toClearBtn) {
            this.toClearBtn.onclick = () => this.clearToInput();
        }
    }

    private controlFromInput(): void {
        const [from, to] = this.getParsed(this.fromInput, this.toInput);

        if (from > to) {
            this.fromSlider.value = String(to);
            this.fromInput.value = String(to);
        } else {
            this.fromSlider.value = String(from);
        }

        this.fillSlider();
    }

    private controlToInput(): void {
        const [from, to] = this.getParsed(this.fromInput, this.toInput);

        if (from <= to) {
            this.toSlider.value = String(to);
        } else {
            this.toInput.value = String(from);
            this.toSlider.value = String(from);
        }
    }

    private controlFromSlider(): void {
        const [from, to] = this.getParsed(this.fromSlider, this.toSlider);

        if (from > to) {
            this.fromSlider.value = String(to);
            this.fromInput.value = String(to);
        } else {
            this.fromInput.value = String(from);
        }

        this.fillSlider();
    }

    private controlToSlider(): void {
        const [from, to] = this.getParsed(this.fromSlider, this.toSlider);

        if (from <= to) {
            this.toInput.value = String(to);
        } else {
            this.toSlider.value = String(from);
            this.toInput.value = String(from);
        }

        this.fillSlider();
    }

    private getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): [number, number] {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [isNaN(from) ? 0 : from, isNaN(to) ? 0 : to];
    }

    private fillSlider(): void {
        const from = this.fromSlider;
        const to = this.toSlider;
        const rangeDistance = parseInt(to.max, 10) - parseInt(to.min, 10);
        const fromPosition = parseInt(from.value, 10) - parseInt(to.min, 10);
        const toPosition = parseInt(to.value, 10) - parseInt(to.min, 10);

        const fromPercent = rangeDistance === 0 ? 0 : (fromPosition / rangeDistance) * 100;
        const toPercent = rangeDistance === 0 ? 0 : (toPosition / rangeDistance) * 100;

        this.controlSlider.style.background = `linear-gradient(
            to right,
            ${this.sliderColor} 0%,
            ${this.sliderColor} ${fromPercent}%,
            ${this.rangeColor} ${fromPercent}%,
            ${this.rangeColor} ${toPercent}%,
            ${this.sliderColor} ${toPercent}%,
            ${this.sliderColor} 100%)`;
    }

    private clearFromInput(): void {
        const minValue = this.fromSlider.min || '0';
        this.fromInput.value = minValue;
        this.fromSlider.value = minValue;
        this.fillSlider();
    }

    private clearToInput(): void {
        const minValue = this.toSlider.min || '0';
        this.toInput.value = minValue;
        this.toSlider.value = minValue;
        this.fillSlider();
    }
}
