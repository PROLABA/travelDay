export class ContactForm {
    private form: HTMLFormElement;
    private nameInput: HTMLInputElement;
    private emailInput: HTMLInputElement;
    private messageInput: HTMLTextAreaElement;
    private notification: HTMLElement;
    private notificationContent: HTMLElement;
    private formContainer: HTMLElement;
    private messageInputClass: HTMLElement;

    constructor() {
        this.form = document.querySelector('.contacts_form') as HTMLFormElement;
        this.nameInput = this.form.querySelector('.contacts_form__input--name') as HTMLInputElement;
        this.emailInput = this.form.querySelector('.contacts_form__input--email') as HTMLInputElement;
        this.messageInput = this.form.querySelector('.contacts_form__input--massage') as HTMLTextAreaElement;
        this.messageInputClass = document.querySelector('.form__textarea') as HTMLElement;
        this.notification = document.querySelector('.notification') as HTMLElement;
        this.notificationContent = document.querySelector('.notification__content') as HTMLElement;
        this.formContainer = document.querySelector('.contacts_form') as HTMLElement;

        this.init();
    }

    private init(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.nameInput.addEventListener('input', (e) => this.handleInput(e));
        this.emailInput.addEventListener('input', (e) => this.handleInput(e));
        this.messageInput.addEventListener('input', (e) => this.handleInput(e));
    }

    private handleInput(e: Event): void {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement;
        const parent = input.parentElement;
        if (!parent) return;
        
        const label = parent.querySelector('.form__label');
        if (label) {
            label.style.display = input.value.trim() ? 'none' : 'block';
        }
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        if (isEmailValid && isMessageValid) {
            this.showNotification();
            setTimeout(() => this.resetForm(), 10000);
        }
    }

    private validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const wrapper = this.emailInput.parentElement;
        wrapper?.querySelector('.error-message')?.remove();

        if (!this.emailInput.value || !emailRegex.test(this.emailInput.value)) {
            this.emailInput.classList.add('error');
            const error = document.createElement('label');
            error.className = 'error-message';
            error.textContent = 'Заполните поле';
            error.setAttribute('for', 'email');
            wrapper?.insertBefore(error, this.emailInput);
            return false;
        }
        
        this.emailInput.classList.remove('error');
        return true;
    }

    private validateMessage(): boolean {
        const wrapper = this.messageInput.parentElement;
        wrapper?.querySelector('.error-message')?.remove();

        if (!this.messageInput.value.trim()) {
            this.messageInputClass.classList.add('error');
            const error = document.createElement('label');
            error.className = 'error-message';
            error.textContent = 'Заполните поле';
            error.setAttribute('for', 'message');
            wrapper?.insertBefore(error, this.messageInput); 
            return false;
        }
        
        this.messageInputClass.classList.remove('error');
        return true;
    }

    private showNotification(): void {
        this.formContainer.style.display = 'none';
        this.notification.style.display = 'flex';
        this.notificationContent.style.display = 'flex';
    }

    private resetForm(): void {
        this.form.reset();
        document.querySelectorAll('.form__label').forEach(label => {
            (label as HTMLElement).style.display = 'block';
        });
        this.formContainer.style.display = 'block';
        this.notification.style.display = 'none';
        this.emailInput.classList.remove('error');
        this.messageInput.classList.remove('error');
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
}