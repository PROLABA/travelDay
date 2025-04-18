import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const mainSwiper = () => {
    const swiper = new Swiper('.main-swiper', {
        modules: [Navigation, Pagination],
        navigation: {
            nextEl: '.main-swiper-button-next ',
            prevEl: '.main-swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        spaceBetween: 10,
        slidesPerView: 1
    });
};
