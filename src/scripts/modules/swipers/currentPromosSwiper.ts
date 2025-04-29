import Swiper from 'swiper';

export const currentPromosSwiper = () => {
    new Swiper('.current-promos__swiper', {
        slidesPerView: 4,
        breakpoints: {
            320: {
                slidesPerView: 1.5,
                spaceBetween: 8
            },
            740: {
                slidesPerView: 3.2,
                spaceBetween: 16
            },
            1140: {
                slidesPerView: 4,
                spaceBetween: 24
            }
        }
    });
};
