import anime from "animejs/lib/anime.es.js";

export const searchAction = (): void => {
  const inputContainer = document.querySelector(
    ".input-search-container"
  ) as HTMLElement | null;

  const searchContainer = document.querySelector(
    ".input-search-content"
  ) as HTMLElement | null;

  const searchOverlay = document.querySelector(
    ".overlay-search"
  ) as HTMLElement | null;

  const input = inputContainer?.querySelector(
    "input"
  ) as HTMLInputElement | null;
  const step1 = document.querySelector(
    ".input-search-content-step1"
  ) as HTMLElement | null;

  const step2 = document.querySelector(
    ".input-search-content-step2"
  ) as HTMLElement | null;

  const searchItem = inputContainer?.querySelector(
    ".search-item"
  ) as HTMLElement | null;

  const clearInputBtn = searchItem?.querySelector(".clear-search");

  if (
    !inputContainer ||
    !searchContainer ||
    !searchOverlay ||
    !step1 ||
    !step2 ||
    !input ||
    !searchItem
  )
    return;

  let isOpen = false; // Флаг для отслеживания состояния
  let isStep2Visible = false; // Флаг для отслеживания текущего шага

  // Функция для показа элементов
  const showSearch = (): void => {
    if (isOpen) return;
    isOpen = true;

    searchContainer.style.display = "block";
    searchOverlay.style.display = "block";

    anime({
      targets: [searchContainer, searchOverlay],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  // Функция для скрытия элементов
  const hideSearch = (): void => {
    if (!isOpen) return;
    isOpen = false;

    anime({
      targets: [searchContainer, searchOverlay],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInQuad",
      complete: () => {
        searchContainer.style.display = "none";
        searchOverlay.style.display = "none";
      },
    });
  };

  // Функция для переключения step1/step2 с анимацией (только один раз)
  const toggleSteps = (): void => {
    const hasText = input.value.trim() !== "";

    if (hasText && !isStep2Visible) {
      isStep2Visible = true;

      anime({
        targets: step1,
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 300,
        easing: "easeInQuad",
        complete: () => {
          step1.style.display = "none";
          step2.style.display = "block";
          searchItem.style.display = "flex";
          anime({
            targets: step2,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: "easeOutQuad",
          });
        },
      });
    } else if (!hasText && isStep2Visible) {
      isStep2Visible = false;

      anime({
        targets: step2,
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 300,
        easing: "easeInQuad",
        complete: () => {
          step2.style.display = "none";
          step1.style.display = "block";
          searchItem.style.display = "none";

          anime({
            targets: step1,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: "easeOutQuad",
          });
        },
      });
    }
  };
  const clearInput = (): void => {
    input.value = "";
    toggleSteps();
  };
  // Слушатели событий
  clearInputBtn?.addEventListener("click", clearInput);
  inputContainer.addEventListener("click", showSearch);
  searchOverlay.addEventListener("click", hideSearch);
  input.addEventListener("input", toggleSteps); // При вводе текста переключаем шаги
};
