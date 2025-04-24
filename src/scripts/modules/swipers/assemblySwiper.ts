import Swiper from 'swiper';

export const mainSwiper = () => {
    const swiper = new Swiper('.main-swiper', {
        slidesPerView: 'auto',
        breakpoints: {
            0: {
                // slidesPerView: 2.2,
                spaceBetween: 8
            },
            768: {
                // slidesPerView: 4,
                spaceBetween: 24
            }
        }
    });
};
