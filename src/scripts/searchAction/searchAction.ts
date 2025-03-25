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

  const openSearchResult = searchItem?.querySelector(".getSearch");

  const searchContentOverlay = document.querySelector(
    ".search-content-container-overlay"
  ) as HTMLElement | null;

  const searchContent = document.querySelector(
    ".search-content-container"
  ) as HTMLElement | null;

  const closeSearchResult = document.querySelector(
    ".get-back"
  ) as HTMLElement | null;

  const openMenu = document.querySelector(".openMenu") as HTMLElement | null;

  const overlay = document.querySelector(
    ".header-menu-container-overlay "
  ) as HTMLElement | null;

  const menu = document.querySelector(".header-menu") as HTMLElement | null;

  const html = document.querySelector("html") as HTMLElement;

  if (!openMenu || !overlay || !menu) return;

  if (
    !inputContainer ||
    !searchContainer ||
    !searchOverlay ||
    !step1 ||
    !step2 ||
    !input ||
    !searchItem ||
    !openSearchResult ||
    !searchContentOverlay ||
    !searchContent
  )
    return;

  let isOpen = false;
  let isStep2Visible = false;
  let searchResult = false;
  let isOpenMenu = false;

  const showSearch = (): void => {
    if (isOpen) return;
    isOpen = true;
    searchContainer.style.display = "block";
    searchOverlay.style.display = "block";
    html.style.overflow = "hidden";

    anime({
      targets: [searchContainer, searchOverlay],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  };

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
        html.style.overflow = "auto";
        searchOverlay.style.display = "none";
      },
    });
  };

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

  const searchResultOpen = (): void => {
    if (searchResult) return;
    searchResult = true;
    searchContent.style.display = "flex";
    searchContentOverlay.style.display = "flex";
    html.style.overflow = "hidden";

    anime({
      targets: [searchContent, searchContentOverlay],
      opacity: [0, 1],
      duration: 300,
      easing: "easeInQuad",
    });
  };

  const searchResultClose = (): void => {
    if (!searchResult) return;
    searchResult = false;

    anime({
      targets: [searchContent, searchContentOverlay],
      opacity: [1, 0], // Исправлено направление анимации
      duration: 500,
      easing: "easeInQuad",
      complete: () => {
        searchContent.style.display = "none";
        searchContentOverlay.style.display = "none";
        html.style.overflow = "none";

      },
    });
  };

  //открытие меню
  const openMenuHandler = () => {
    if (isOpenMenu) return;
    isOpenMenu = true;
    menu.style.display = "block";
    openMenu.classList.add("active");
    overlay.style.display = "block";
    html.style.overflow = "hidden";
    anime({
      targets: [menu, overlay],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  };
  // закрытие меню
  const closeMenuHandler = () => {
    if (!isOpenMenu) return;
    isOpenMenu = false;

    anime({
      targets: [menu, overlay],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInQuad",
      complete: () => {
        menu.style.display = "none";
        overlay.style.display = "none";
        html.style.overflow = "auto";
        openMenu.classList.remove("active");
      },
    });
  };

  // Слушатели событий
  openMenu.addEventListener("click", () => {
    if (isOpenMenu) {
      closeMenuHandler();
    } else {
      openMenuHandler();
      hideSearch();
    }
  });
  overlay.addEventListener("click", closeMenuHandler);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenuHandler();
    }
  });
  clearInputBtn?.addEventListener("click", () => {
    clearInput();
    searchResultClose();
  });
  inputContainer.addEventListener("click", () => {
    showSearch();
    closeMenuHandler()
  });
  searchOverlay.addEventListener("click", () => {
    hideSearch();
    clearInput();
  });
  input.addEventListener("input", () => {
    searchResultClose();
    toggleSteps();
  });
  openSearchResult.addEventListener("click", () => {
    if (!searchResult) {
      searchResultOpen();
      clearInput();
    } else {
      searchResultClose();
    }
  });

  // Закрытие результатов поиска при клике вне них
  searchContentOverlay.addEventListener("click", searchResultClose);
  closeSearchResult?.addEventListener("click", searchResultClose);
};
