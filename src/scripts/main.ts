import 'virtual:svg-icons-register';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
import { initVideoPlayers } from './modules/videoPlayer';
import { swiperWidthAuto } from './modules/swipers/swiperWidthAuto';
import initDropdowns from './modules/dropdowns';
import { formAjaxNewsletter } from './modules/formAjaxNewsletter';
import { RangeSlider } from './modules/rangeSlider';
import { initShowMoreList } from './modules/showMoreList';
import initCatalogAside from './modules/catalogAside';

document.addEventListener('DOMContentLoaded', () => {
    searchAction();
    swiperDiscount();
    mainSwiper();
    sliderCard();
    mobileSearchAction();
    faqAccordion();
    if (document.querySelector('.contacts_form')) {
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
    if (document.querySelector('.video-container')) {
        initVideoPlayers();
    }
    swiperWidthAuto();
    initDropdowns();

    formAjaxNewsletter();

    const rangeSliderContainers = document.querySelectorAll<HTMLElement>('.js-range-slider');
    if (rangeSliderContainers) {
        rangeSliderContainers.forEach(container => {
            new RangeSlider(container);
        });
    }
    initShowMoreList();
    initCatalogAside();
});
