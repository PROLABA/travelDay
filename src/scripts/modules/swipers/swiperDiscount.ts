import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const swiperDiscount = () => {
  const swiper = new Swiper(".swiper-discount", {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".arrow-btn-next",
      prevEl: ".arrow-btn-prev",
    },
    spaceBetween: 24,
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
};
