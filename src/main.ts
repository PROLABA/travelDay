import 'virtual:svg-icons-register';
import { sliderCard } from './scripts/cardSlider';
import { mainSwiper } from './scripts/mainSwiper';
import { mobileSearchAction } from './scripts/mobileSearchAction';
import { searchAction } from './scripts/searchAction/searchAction';
import { swiperDiscount } from './scripts/swiperDiscount/swiperDiscount';
import { faqAccordion } from './scripts/faqAccordion';
import { ContactForm } from './scripts/contactsForm';
import { currentPromosSwiper } from './scripts/currentPromosSwiper';
import { usePromocode } from './scripts/promocode';
import { CartCounter } from './scripts/cartBlankCounter';
import { initDialogs } from './scripts/modals';
import { ImageZoomPan } from './scripts/cropper';

document.addEventListener('DOMContentLoaded', () => {
    searchAction();
    swiperDiscount();
    mainSwiper();
    sliderCard();
    mobileSearchAction();
    faqAccordion();
    if (document.querySelector('.contacts-blocks')) {
        new ContactForm();
    }
    if (document.querySelector('.current-promos__swiper')) {
        currentPromosSwiper();
    }
    if (document.querySelector('.promocode-input')) {
        usePromocode();
    }
    if (document.querySelector('.cart-blank__count')) {
        new CartCounter('.cart-blank__count-value');
    }
    initDialogs();
    if (document.querySelector('.select-image')) {
        const img = document.querySelector('.select-image') as HTMLElement;
        new ImageZoomPan(img);
    }
});
