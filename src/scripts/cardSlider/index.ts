import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const sliderCard = () => {
  document
    .querySelectorAll<HTMLElement>(".swiper-card")
    .forEach((sliderElement) => {
      const swiper = new Swiper(sliderElement, {
        modules: [Pagination],
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: sliderElement.querySelector(".swiper-pagination") as HTMLElement,
          clickable: true,
        },
      });

      sliderElement.addEventListener("mousemove", (e) => {
        if (!sliderElement.closest("[data-mousemove-swipe]")) return;

        swiper.update(); // Обновляем Swiper для актуальных размеров

        const rect = sliderElement.getBoundingClientRect();
        const sliderWidth = rect.width;
        const sliderLength = swiper.slides.length;
        const sliderPath = sliderWidth / sliderLength;
        const sliderMousePos = e.clientX - rect.left;

        let sliderSlide = Math.floor(sliderMousePos / sliderPath);
        sliderSlide = Math.max(0, Math.min(sliderSlide, sliderLength - 1));

        swiper.slideTo(sliderSlide);
      });
    });
};
