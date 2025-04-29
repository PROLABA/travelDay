import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// Хранилище активных экземпляров Swiper и их обработчиков
const swiperInstances = new WeakMap();

export const sliderCard = () => {
    document.querySelectorAll<HTMLElement>('.swiper-card').forEach(sliderElement => {
        // Защита от повторной инициализации
        if (swiperInstances.has(sliderElement)) return;

        const swiper = new Swiper(sliderElement, {
            modules: [Pagination],
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: sliderElement.querySelector('.swiper-pagination') as HTMLElement,
                clickable: true
            }
        });

        // Обработчики
        const onMouseMove = (e: MouseEvent) => {
            if (!sliderElement.closest('[data-mousemove-swipe]')) return;

            const rect = sliderElement.getBoundingClientRect();
            const sliderWidth = rect.width;
            const sliderLength = swiper.slides.length;
            const sliderPath = sliderWidth / sliderLength;
            const sliderMousePos = e.clientX - rect.left;

            let sliderSlide = Math.floor(sliderMousePos / sliderPath);
            sliderSlide = Math.max(0, Math.min(sliderSlide, sliderLength - 1));

            swiper.slideTo(sliderSlide);
        };

        const onMouseLeave = () => {
            swiper.slideTo(0);
        };

        // Сохраняем данные
        swiperInstances.set(sliderElement, {
            swiper,
            onMouseMove,
            onMouseLeave
        });

        // Назначаем события
        sliderElement.addEventListener('mousemove', onMouseMove);
        sliderElement.addEventListener('mouseleave', onMouseLeave);
    });
};

// Функция для остановки всех слайдеров (вызывать при переходе между страницами)
export const destroySliders = () => {
    document.querySelectorAll<HTMLElement>('.swiper-card').forEach(sliderElement => {
        if (swiperInstances.has(sliderElement)) {
            const { swiper, onMouseMove, onMouseLeave } = swiperInstances.get(sliderElement);

            // Убираем слушатели
            sliderElement.removeEventListener('mousemove', onMouseMove);
            sliderElement.removeEventListener('mouseleave', onMouseLeave);

            // Уничтожаем слайдер
            if (swiper && !swiper.destroyed) {
                swiper.destroy(true, true); // полное уничтожение
            }

            // Удаляем из хранилища
            swiperInstances.delete(sliderElement);
        }
    });
};
