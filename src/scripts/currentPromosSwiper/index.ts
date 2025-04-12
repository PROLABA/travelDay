import Swiper from 'swiper';
// import 'swiper/css';

export const currentPromosSwiper = () => {
    new Swiper('.current-promos__swiper', {
        spaceBetween: 24,
        slidesPerView: 4
    });
};
