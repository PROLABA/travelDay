import 'virtual:svg-icons-register';
import { sliderCard } from './modules/swipers/cartSlider';
import { mainSwiper } from './modules/swipers/mainSwiper';
import { mobileSearchAction } from './modules/mobileSearchAction';
import { searchAction } from './modules/searchAction';
import { swiperDiscount } from './modules/swipers/swiperDiscount';
import { faqAccordion } from './modules/faqAccordion';
import { ContactForm } from './modules/contactForm';
import { currentPromosSwiper } from './modules/swipers/currentPromosSwiper';
import { usePromocode } from './modules/promocode';
import { CartCounter } from './modules/cartBlankCounter';
import { initDialogs } from './modules/modals';
import { ImageZoomPan } from './modules/cropper';
import { thumbGallery } from './modules/swipers/thumbGallery';
import initTabs from './modules/tabs';
import { TextToggle } from './modules/textToggle';
import initCustomDatepicker from './modules/datepicker';

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
    if (document.querySelector('.excursion-gallery')) {
        thumbGallery();
    }
    // универсальный таб
    initTabs({
        tabButtonsSelector: '.js-tab-btn',
        tabContentsSelector: '.js-tab-content'
    });

    const toggler = new TextToggle('p.toggle-text', 250);
    toggler.init();

    initCustomDatepicker();
});
