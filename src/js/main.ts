document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".header__menu-button");
  const nav = document.querySelector(".header__nav");
  const overlay = document.querySelector(".overlay");

  menuButton?.addEventListener("click", () => {
    nav?.classList.toggle("header__nav--active");
    menuButton?.classList.toggle("header__menu-button--active");
    overlay?.classList.toggle("overlay--active");
  });

  overlay?.addEventListener("click", () => {
    nav?.classList.remove("header__nav--active");
    menuButton?.classList.remove("header__menu-button--active");
    overlay?.classList.remove("overlay--active");
  });
});
