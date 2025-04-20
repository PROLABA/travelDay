// modules/textToggle.ts
export class TextToggle {
    constructor(
        private selector: string,
        private maxChars: number = 200,
        private showMoreText: string = 'Показать больше',
        private showLessText: string = 'Показать меньше'
    ) {}

    init(): void {
        const elements = document.querySelectorAll<HTMLElement>(this.selector);

        elements.forEach(el => {
            const fullText = el.textContent?.trim() || '';

            if (fullText.length <= this.maxChars) return;

            const truncatedText = fullText.slice(0, this.maxChars);

            const button = document.createElement('button');
            button.textContent = this.showMoreText;
            button.classList.add('text-toggle-btn');

            const full = document.createElement('span');
            full.textContent = fullText;
            full.style.display = 'none';

            const short = document.createElement('span');
            short.textContent = truncatedText;

            el.textContent = '';
            el.appendChild(short);
            el.appendChild(full);
            el.appendChild(button);

            button.addEventListener('click', () => {
                const isExpanded = full.style.display === 'inline';

                full.style.display = isExpanded ? 'none' : 'inline';
                short.style.display = isExpanded ? 'inline' : 'none';
                button.textContent = isExpanded ? this.showMoreText : this.showLessText;
                button.classList.toggle('active', !isExpanded);
            });
        });
    }
}
