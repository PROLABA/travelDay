export const formAjaxNewsletter = () => {
    const form = document.querySelector('.js-form-newsletter');
    if (!form) return;

    form.addEventListener('submit', function (this: HTMLFormElement, e: Event) {
        e.preventDefault();

        const formData = new FormData(this);
        // const data = new URLSearchParams(formData as any).toString();
        const data = new URLSearchParams();
        formData.forEach((value, key) => {
            data.append(key, value.toString());
        });

        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Ошибка сервера: ' + response.status);
            })
            .then(() => {
                const formInner = document.querySelector('.form-inner');
                if (formInner) (formInner as HTMLElement).style.display = 'none';

                const img = document.querySelector('.bottom-form__container-right-img img');
                if (img) (img as HTMLImageElement).src = '/public/images/bottomForm/bottomForm-success.png';

                const title = document.querySelector('.bottom-form__container-left-title .h2');
                if (title) title.textContent = 'На вашу почту отправлена ссылка для подтверждения';

                const subtitle = document.querySelector('.bottom-form__container-left-title .body-m-2');
                if (subtitle)
                    subtitle.textContent =
                        'Перейдите по ней и ожидайте свежие новости и специальные предложения в ближайшее время!';
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    });
};
