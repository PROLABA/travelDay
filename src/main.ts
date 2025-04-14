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
});
