import { sliderCard } from "./scripts/cardSlider";
import { mainSwiper } from "./scripts/mainSwiper";
import { mobileSearchAction } from "./scripts/mobileSearchAction";
import { searchAction } from "./scripts/searchAction/searchAction";
import { swiperDiscount } from "./scripts/swiperDiscount/swiperDiscount";

document.addEventListener("DOMContentLoaded", () => {
  searchAction();
  swiperDiscount();
  mainSwiper();
  sliderCard();
  mobileSearchAction();
});
