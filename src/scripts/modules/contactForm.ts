export class ContactForm {
    private form: HTMLFormElement;
    private emailInput: HTMLInputElement;
    private messageInput: HTMLTextAreaElement;
    private notification: HTMLElement;
    private notificationContent: HTMLElement;
    private formContainer: HTMLElement;
    private messageInputClass: HTMLElement;

    constructor() {
        this.form = document.querySelector('.form') as HTMLFormElement;
        this.emailInput = this.form.querySelector('input[type="email"]') as HTMLInputElement;
        this.messageInput = this.form.querySelector('textarea') as HTMLTextAreaElement;
        this.messageInputClass = document.querySelector('.form__textarea') as HTMLElement;
        this.notification = document.querySelector('.notification') as HTMLElement;
        this.notificationContent = document.querySelector('.notification__content') as HTMLElement;
        this.formContainer = document.querySelector('.form') as HTMLElement;

        this.init();
    }

    private init(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
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
        this.formContainer.style.display = 'block';
        this.notification.style.display = 'none';
        this.emailInput.classList.remove('error');
        this.messageInput.classList.remove('error');
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
}