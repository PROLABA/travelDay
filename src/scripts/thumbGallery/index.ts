import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const thumbGallery = () => {
    const swiper2 = new Swiper('.excursion-gallery__swiper-bottom', {
        modules: [Navigation, Pagination, Thumbs],
        navigation: {
            nextEl: '.main-swiper-button-next',
            prevEl: '.main-swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        spaceBetween: 8,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 5.5
            }
        }
    });
    const swiper1 = new Swiper('.excursion-gallery__swiper-top', {
        modules: [Navigation, Pagination, Thumbs],
        navigation: {
            nextEl: '.main-swiper-button-next',
            prevEl: '.main-swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: {
            swiper: swiper2
        }
    });
};
