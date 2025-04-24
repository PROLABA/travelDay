import Swiper from 'swiper';

export const swiperWidthAuto = () => {
    const swiper = new Swiper('.swiper-width-auto', {
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
