import anime from "animejs";

export const mobileSearchAction = () => {
  const searchButton = document.querySelector(
    ".get-search"
  ) as HTMLElement | null;
  const closeButton = document.querySelector(
    ".close-search-menu"
  ) as HTMLElement | null;
  const searchBox = document.querySelector(
    ".header-mobile-search"
  ) as HTMLElement | null;
  const searchInput = document.querySelector(
    ".get-search-input"
  ) as HTMLInputElement | null;
  const step1 = document.querySelector(
    ".header-mobile-search-step1"
  ) as HTMLElement | null;
  const step2 = document.querySelector(
    ".header-mobile-search-step2"
  ) as HTMLElement | null;
  const htmlElement = document.documentElement;
  let isVisible: boolean = false;

  if (
    !searchButton ||
    !closeButton ||
    !searchBox ||
    !searchInput ||
    !step1 ||
    !step2
  )
    return;

  function openSearchMenu() {
    if (!searchBox) return;
    searchBox.style.display = "block";
    htmlElement.style.overflow = "hidden";
    anime({
      targets: searchBox,
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
    isVisible = true;
  }
  function closeSearchMenu() {
    if (!searchBox) return;
    anime({
      targets: searchBox,
      opacity: [1, 0],
      duration: 500,
      easing: "easeInOutQuad",
      complete: function () {
        searchBox.style.display = "none";
        htmlElement.style.overflow = "auto";
      },
    });
    isVisible = false;
  }

  searchButton.addEventListener("click", openSearchMenu);
  closeButton.addEventListener("click", closeSearchMenu);

  let previousValue = "";
  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() !== "" && previousValue === "") {
      anime({
        targets: step1,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInOutQuad",
        complete: function () {
          step1.style.display = "none";
          step2.style.display = "block";
          anime({
            targets: step2,
            opacity: [0, 1],
            duration: 300,
            easing: "easeInOutQuad",
          });
        },
      });
    } else if (searchInput.value.trim() === "" && previousValue !== "") {
      anime({
        targets: step2,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInOutQuad",
        complete: function () {
          step2.style.display = "none";
          step1.style.display = "block";
          anime({
            targets: step1,
            opacity: [0, 1],
            duration: 300,
            easing: "easeInOutQuad",
          });
        },
      });
    }
    previousValue = searchInput.value.trim();
  });
};
