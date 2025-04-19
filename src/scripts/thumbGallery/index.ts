import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export const thumbGallery = () => {
    const swiper2 = new Swiper('.excursion-gallery__swiper-bottom', {
        modules: [Navigation, Thumbs],
        navigation: {
            nextEl: '.excursion-gallery__nav--bottom .excursion-gallery__button--next',
            prevEl: '.excursion-gallery__nav--bottom .excursion-gallery__button--prev'
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
        modules: [Navigation, Thumbs],
        navigation: {
            nextEl: '.excursion-gallery__nav--top .excursion-gallery__button--next',
            prevEl: '.excursion-gallery__nav--top .excursion-gallery__button--prev'
        },
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: {
            swiper: swiper2
        }
    });
};
