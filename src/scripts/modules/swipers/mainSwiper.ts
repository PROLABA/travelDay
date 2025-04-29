import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

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
        slidesPerView: 1,
        on: {
            afterInit: function (swiper) {
                if (swiper.wrapperEl.parentElement) {
                    swiper.wrapperEl.parentElement.style.height = 'unset';
                }
            }
        }
    });
};
