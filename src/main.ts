import { sliderCard } from "./scripts/cardSlider";
import { mainSwiper } from "./scripts/mainSwiper";
import { mobileSearchAction } from "./scripts/mobileSearchAction";
import { searchAction } from "./scripts/searchAction/searchAction";
import { swiperDiscount } from "./scripts/swiperDiscount/swiperDiscount";
import { faqAccordion } from "./scripts/faqAccordion";
import { initVideoPlayers } from "./scripts/videoPlayer";
import { ContactForm } from "./scripts/contactsForm";

document.addEventListener("DOMContentLoaded", () => {
  searchAction();
  swiperDiscount();
  mainSwiper();
  sliderCard();
  mobileSearchAction();
  faqAccordion();
  initVideoPlayers();
  new ContactForm();
});